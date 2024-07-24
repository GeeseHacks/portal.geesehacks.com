import { formSchemaType } from "./formSchema";

export const formSubmission = async (data: formSchemaType, session: any) => {
  try {
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }

    const userId = Number(session.user.id);
    const resumeFile = data.resume[0];

    let resumeUrl = "";
    if (resumeFile && resumeFile.name) {
      const filename = encodeURIComponent(resumeFile.name);
      const uploadResponse = await fetch(`/api/resume?filename=${filename}`, {
        method: "POST",
        body: resumeFile,
      });
      const blob = await uploadResponse.json();
      resumeUrl = blob.url;
    }

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        firstname: data.firstName,
        lastname: data.lastName,
        age: data.age,
        email: data.email,
        phone_number: data.phoneNumber,
        school: data.school,
        level_of_study: data.levelOfStudy,
        field_of_study: data.fieldOfStudy,
        country_of_residence: data.countryOfResidence,
        address: data.address,
        dietary_restrictions: data.dietaryRestrictions,
        github: data.githubProfile,
        linkedin: data.linkedin,
        personal_website: data.personalWebsite,
        resume: resumeUrl,
        MLH_authorize: data.mlhCodeOfConduct && data.mlhPrivacyPolicy,
        optional_consider: data.sexuality,
        optional_gender: data.gender,
        optional_pronouns: data.pronouns,
        optional_race: data.ethnicity,
        optional_underrepresented: data.underrepresented,
        t_shirt_size: data.tShirtSize,
        status: "APPLIED"
      }),
    });

    await fetch("/api/application-responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userId,
        q1: data.q1,
        q2: data.q2,
        q3: data.q3,
      }),
    });

    console.log("form is submitted!");
  } catch (err) {
    console.error("Submission Error: ", err);
  }
};
