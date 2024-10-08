"use client"; // Add this line to mark the component as a client component

import SideNav from "@/components/nav/SideNav";
import Head from "next/head";
import Link from "next/link"; // Import Link from Next.js
import { useState, useEffect } from "react"; // Import useState and useEffect for state management

const Dashboard: React.FC = () => {
  // State to hold application status
  const [applicationStatus, setApplicationStatus] = useState<string>("Loading...");

  // Fetch the application status from the API
  useEffect(() => {
    const fetchApplicationStatus = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (response.ok) {
        setApplicationStatus(data.status); // Update state with fetched status
      } else {
        setApplicationStatus('Error fetching status'); // Handle error state
      }
    };

    fetchApplicationStatus(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="h-screen w-screen flex overflow-y-scroll">
      {/* SideNav */}
      <SideNav />

      {/* Home Content */}
      <div className="flex flex-col py-24 space-y-10 px-12 xl:px-32 h-screen min-h-96 flex-grow">
        <h1 className="text-4xl my-2">Home</h1>
        <p className="text-gray-500">Welcome fellow Geese [something a Geese would say]</p>

        <div className="bg-cpurple p-8 rounded-xl w-full min-h-52 space-y-4">
          <h2 className="font-light text-lg">Application Status</h2>
          <h2 className="font-semibold text-4xl">{applicationStatus}</h2>
          {/* Link to Application Page */}
          <Link href="/application" className="mt-2 bg-purple-500 px-4 py-2 rounded-full inline-block">
            {applicationStatus === "NOT SUBMITTED" ? "Apply Now" : "View Application"}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 min-h-52">
          <div className="bg-cpurple p-8 rounded-xl">FAQ</div>
          <div className="bg-cpurple p-8 rounded-xl">
            <Link href="/another-page">Jumps to another page?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;