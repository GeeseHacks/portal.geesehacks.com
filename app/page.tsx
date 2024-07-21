import Image from "next/image";
import SignUp, { metadata as signUpMetadata } from "@/app/signup/page";

export const metadata = signUpMetadata;

export default function Home() {
  // TODO: Logic to determine if a redirect is needed (using next/navigation)
  // const accessDenied = true
  // if (accessDenied) {
  //   redirect('/login')
  // }
 
  return (
    <SignUp />
  );
}
