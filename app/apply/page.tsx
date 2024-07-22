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

export const metadata = {
  title: "Apply | GeeseHacks",
}
