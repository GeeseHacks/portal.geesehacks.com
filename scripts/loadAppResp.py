"""
Run Guide:
1. cd into the scripts/ directory
2. Install the required packages by running `pip install -r requirements.txt` (preferably in a virtual environment)
3. Create a `.env` file. Paste the values from Discord (the woods channel) into the `.env` file.
4. Create a credential_file.json file with the Google Sheets API credentials. Values also in the woods channel.
5. Make a copy of the schema.prisma file in prisma/. under scripts/. Comment out the `provider: prisma-client-js` field and uncomment `provider: prisma-client-py` and  `output: ...` fields.
6. Run `prisma generate` to generate the Python client.
7. Run `python3 loadAppResp.py`.
"""

import os
import sys
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from dotenv import load_dotenv

# Add parent directory to Python path
from prisma import Prisma

# Load environment variables from .env file
load_dotenv('./env')  # Adjust path as needed

# Set up Google Sheets API credentials
def setup_gspread(credentials_file, spreadsheet_name):
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive",
    ]
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
    client = gspread.authorize(credentials)
    return client.open(spreadsheet_name)

# Initialize Prisma client
prisma = Prisma()

async def main():
    # Connect to the database
    await prisma.connect()

    # Query the database
    users = await prisma.user.find_many(
        # include={
        #     "firstname": True,
        #     "lastname": True,
        #     "email": True,
        #     "age": True,
        #     "school": True,
        #     "level_of_study": True,
        #     "github": True,
        #     "linkedin": True,
        #     "resume": True,
        #     "application_responses": True,
        # }
    )

    # Format the data for Google Sheets
    data = [
        [
            user.firstname,
            user.lastname,
            user.email,
            user.age,
            user.school,
            user.level_of_study,
            user.github or "N/A",
            user.linkedin or "N/A",
            user.resume or "N/A",
            " | ".join([str(resp) for resp in user.application_responses]) if user.application_responses else "N/A",
        ]
        for user in users
    ]

    # Add headers
    headers = [
        "First Name",
        "Last Name",
        "Email",
        "Age",
        "School",
        "Level of Study",
        "GitHub",
        "LinkedIn",
        "Resume",
        "Application Responses",
    ]
    data.insert(0, headers)

    # Load data into Google Sheets
    credentials_file = "credentials_file.json"
    spreadsheet_name = "GeeseHacks 2025 Applicants List"
    spreadsheet = setup_gspread(credentials_file, spreadsheet_name)

    # Assuming we're working with the first sheet
    sheet = spreadsheet.sheet1

    # UNCOMMENT TO CLEAR SHEET BEFORE UPDATING
    # sheet.clear()  # Clear existing data
    sheet.update("A1", data)  # Update the sheet with new data

    # Disconnect from the database
    await prisma.disconnect()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
