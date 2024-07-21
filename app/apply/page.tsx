import RegistrationForm from "@/components/apply";

export default function registrationForm() {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  return {
    title: "Apply | GeeseHacks",
    description: "GeeseHacks, a hybrid hackathon and case competition, will be held from January 10-13, 2025. Participants are invited to create innovative projects or craft unique solutions for real-world challenges. Join us for a weekend of creativity, collaboration, and problem-solving!",
  }
}