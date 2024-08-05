import SideNav from "@/components/nav/SideNav";
import Head from "next/head";

const Home: React.FC = () => {
  return <div className="h-screen w-screen flex overflow-y-scroll">
    {/* SideNav */}
    <SideNav />

    {/* Home Content */}
    <div className="flex flex-col py-24 space-y-10 px-12 xl:px-32 h-screen min-h-96 flex-grow">
      <div>
        <h1 className="text-4xl my-2">Home</h1>
        <p className="text-gray-500">Welcome fellow Geese [something a Geese would say]</p>
      </div>

      <div className="bg-cpurple p-8 rounded-xl w-full min-h-52 space-y-4">
        <h2 className="font-light text-lg">Application Status</h2>
        <h2 className="font-semibold text-4xl">NOT SUBMITTED</h2>
        <button className="mt-2 bg-purple-500 px-4 py-2 rounded-full">Apply Now</button>
      </div>

      <div className="grid grid-cols-2 gap-10 min-h-52">
        <div className="bg-cpurple p-8 rounded-xl">FAQ</div>
        <div className="bg-cpurple p-8 rounded-xl">Jumps to another page?</div>
      </div>
    </div>
    

  </div>
}
export default Home;