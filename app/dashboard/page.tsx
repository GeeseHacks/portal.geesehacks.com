import SideNav from "@/components/nav/SideNav";
import { Filter } from "lucide-react";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen flex overflow-y-scroll">
      {/* Glow Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-48 left-48 m-20 w-1/2 h-1/2 bg-purple-700 rounded-full blur-4xl opacity-20"></div>
        <div className="absolute bottom-48 right-48 m-20 w-1/2 h-1/2 bg-teal-700 rounded-full blur-4xl opacity-20"></div>
      </div>

      <div className="absolute inset-0 z-0">
      {[...Array(400)].map((_, i) => {
        const size = `${Math.random() + 1}px`;
        return (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-35"
            style={{
              width: size,
              height: size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px 2px rgba(255, 255, 255, 0.1)`,
            }}
          ></div>
        );
      })}
    </div>

      {/* SideNav */}
      <SideNav />

      {/* Home Content */}
      <div className="flex flex-col py-24 space-y-10 px-12 xl:px-32 h-screen min-h-96 flex-grow">
        <div>
          <h1 className="text-4xl my-2">Home</h1>
          <p className="text-gray-500">Welcome fellow Geese [something a Geese would say]</p>
        </div>

        <div className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-12 rounded-xl w-full min-h-52 space-y-4 
          relative overflow-hidden 
          hover:scale-102 transition-transform duration-300
          drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]
        ">
          <img src="/static/images/status-notsubmitted.png" alt="Not Submitted" className="absolute right-48 -top-10 z-0" />
          <h2 className="font-light text-lg drop-shadow-[0_0px_5px_rgba(0,0,0,0.5)]">Application Status</h2>
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)]">NOT SUBMITTED</h2>
          <button className="mt-2 bg-purple-500 px-4 py-2 rounded-full">Apply Now</button>
        </div>

        <div className="grid grid-cols-2 gap-10 min-h-52">
          <div className="
            bg-gradient-to-r from-darkpurple to-darkteal 
            p-12 rounded-xl
            relative overflow-hidden 
            hover:scale-102 transition-transform duration-300
            drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]
          ">
            <img src="/static/images/faq.png" alt="FAQ" className=" absolute -right-10 bottom-0 z-0" />
            <h2 className="font-semibold text-4xl">FAQ</h2>
          </div>
          <div className="
            bg-gradient-to-r from-darkpurple to-darkteal 
            p-12 rounded-xl
            relative overflow-hidden 
            hover:scale-102 transition-transform duration-300
            drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]
          ">
            <h2 className="font-semibold text-4xl">QR Code</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;