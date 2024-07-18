
import Login from './login';

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  return {
    title: "Login | GeeseHacks",
    description: "GeeseHacks, a hybrid hackathon and case competition, will be held from January 10-13, 2025. Participants are invited to create innovative projects or craft unique solutions for real-world challenges. Join us for a weekend of creativity, collaboration, and problem-solving!",
  }
}

const Page: React.FC = () => {
  return (
    <Login />
  )
};

export default Page;