import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// /api/flags
export async function GET() {
  try {

    // Authentication setup
    const auth = new google.auth.GoogleAuth({
      projectId: process.env.GOOGLE_PROJECT_ID,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle line breaks in private key
      },
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query data from Google Sheets
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_FLAGS_ID,
        range: 'Flags!A2:B',
      });
      console.log('Rows retrieved:', response.data.values);

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.warn('No data found in the specified range.');
      return NextResponse.json({ message: 'No data found' }, { status: 404 });
    }

    // Map the flags to a structured object
    const flags: { [key: string]: boolean } = {};
    rows.forEach((row, index) => {
      flags[row[0]] = row[1] === 'TRUE';
    });

    // Return the flags data as JSON
    return NextResponse.json(flags, { status: 200 });
  } catch (error) {
    console.error('Full error object:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
