import Image from "next/image";
import Login from "@/components/login";
import SignUp from "@/components/signup";

export default function Home() {
  return (
   <div> 
    <Login></Login>
    <SignUp></SignUp>
   </div>
  );
}
