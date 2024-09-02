"use client";

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
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Assuming the status is within the data object
        setApplicationStatus(data.status || "Not Available");
      } catch (error) {
        console.error('Error fetching application status:', error);
        setApplicationStatus("Error fetching status");
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
        <div>
          <h1 className="text-4xl my-2">Home</h1>
          <p className="text-gray-500">
            Welcome fellow Geese [something a Geese would say]
          </p>
        </div>

        <div className="bg-cpurple p-8 rounded-xl w-full min-h-52 space-y-4">
          <h2 className="font-light text-lg">Application Status</h2>
          <h2 className="font-semibold text-4xl">{applicationStatus}</h2>
          {/* Link to Application Page */}
          <Link href="/application">
            <a className="mt-2 bg-purple-500 px-4 py-2 rounded-full inline-block">
              {applicationStatus === "NOT SUBMITTED" ? "Apply Now" : "View Application"}
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 min-h-52">
          <div className="bg-cpurple p-8 rounded-xl">FAQ</div>
          <div className="bg-cpurple p-8 rounded-xl">
            <Link href="/another-page">
              <a>Jumps to another page?</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;