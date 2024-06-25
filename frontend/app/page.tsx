import Image from "next/image";
import SignUp from "@/app/signup/page";

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
