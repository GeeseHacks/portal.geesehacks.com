import { toast } from 'react-hot-toast';
import { formSchemaType } from "./formSchema";
import { UserStatus } from '@prisma/client';

export const formSubmission = async (data: formSchemaType, session: any) => {
  const submissionPromise = (async () => {
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

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload resume");
        }

        const blob = await uploadResponse.json();
        resumeUrl = blob.url;
      }

      const userResponse = await fetch("/api/users", {
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
          status: UserStatus.APPLIED
        }),
      });

      if (!userResponse.ok) {
        throw new Error("Failed to submit user data");
      }

      const responseResponse = await fetch("/api/application-responses", {
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

      if (!responseResponse.ok) {
        throw new Error("Failed to submit application response");
      }

      console.log("form is submitted!");
    } catch (err) {
      console.error("Submission Error: ", err);
      throw err;
    }
  })();

  toast.promise(submissionPromise, {
    loading: "Submitting application...",
    success: "Application submitted successfully!",
    error: (err) => err.message || "Failed to submit application",
  });

  return submissionPromise; // Ensure the function returns the promise
};
