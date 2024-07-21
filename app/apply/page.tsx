import RegistrationForm from "@/components/apply";
import Head from "next/head";

export default function registrationForm() {
  return (
    <>
      <Head>
        <meta name="description" content="Registration form for GeeseHacks" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <RegistrationForm />
      </div>
    </>
  );
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  return {
    title: "Apply | GeeseHacks",
    description:
      "GeeseHacks, a hybrid hackathon and case competition, will be held from January 10-13, 2025. Participants are invited to create innovative projects or craft unique solutions for real-world challenges. Join us for a weekend of creativity, collaboration, and problem-solving!",
  };
}
