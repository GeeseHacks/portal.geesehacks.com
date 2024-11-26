"use client";

import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusType | null>(null);
  const [scheduleDisabled, setScheduleDisabled] = useState(true); // Change this when hackers are accepted

  type StatusType = "ACCEPTED" | "REJECTED" | "WAITLIST" | "NOT_APPLIED" | "APPLIED";

  const statusMapping: Record<StatusType, string> = {
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
    WAITLIST: "Waitlisted",
    NOT_APPLIED: "Not Applied",
    APPLIED: "Applied",
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/users/status");
        const data = await response.json();

        // Validate the status received from the API
        if (data.status && Object.keys(statusMapping).includes(data.status)) {
          setStatus(data.status as StatusType);
        } else {
          setError("Invalid application status received");
        }
      } catch (err) {
        setError("Error loading application status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-4xl mt-5 mb-2">Home</h1>
        <p className="text-gray-500">
          Welcome fellow Geese. Here&apos;s everything you&apos;ll need for the
          event!
        </p>
      </div>

      {/* Application Status Card */}
      <div
        className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-8 lg:p-12 rounded-xl w-full min-h-56 h-2/6 space-y-4 
          relative overflow-hidden 
          hover:scale-102 transition-transform duration-300 
          hover:drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]
          flex flex-col justify-center
        "
      >
        {/* Status Image */}
        <img
          src={`/static/images/status-${
            status === "APPLIED" ? "submitted" : "notsubmitted"
          }.png`}
          alt={status || "Loading"}
          className="absolute right-0 -top-10 z-0"
        />

        <h2 className="font-light text-lg drop-shadow-[0_0px_5px_rgba(0,0,0,0.5)]">
          Application Status
        </h2>

        {/* Status or Loading/Error Message */}
        {loading ? (
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)]">
            Loading...
          </h2>
        ) : error ? (
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)] text-red-500">
            {error}
          </h2>
        ) : (
          <h2 className="font-semibold text-4xl drop-shadow-[0_0px_10px_rgba(0,0,0,0.5)]">
          {status ? statusMapping[status] || "Unknown Status" : "Status is null"}
          </h2>
        )}

        {/* Apply Button */}
        {status !== "APPLIED" && status !== "ACCEPTED" && (
          <a
            href="/apply"
            className="mt-2 bg-transparent py-2 flex items-center z-10 cursor-pointer"
          >
            Apply
            <FaAngleRight size={22} className="ml-1" />
          </a>
        )}
      </div>

      {/* Additional Cards */}
      <div className="grid lg:grid-cols-2 gap-8 max-h-4/6 lg:min-h-48 mb-8">
        {/* FAQ Card */}
        <Link
          href="https://geesehacks.com#faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="
        bg-gradient-to-r from-darkpurple to-darkteal 
        p-8 lg:p-12 rounded-xl
        relative overflow-hidden 
        hover:scale-102 transition-transform duration-300 
        hover:drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]
        h-48
      "
          >
            <img
              src="/static/images/faq.png"
              alt="FAQ"
              className="absolute -right-24 -bottom-8 -z-10 scale-50"
              />
            <h2 className="text-[30px] font-semibold">FAQ</h2>
            <p className="text-white-500">Common Questions</p>
          </div>
        </Link>

        {/* Schedule Card */}
        <Link
          href={scheduleDisabled ? "#" : "/dashboard/schedule"}
          className={`relative rounded-xl bg-gradient-to-r from-darkpurple to-darkteal p-8 lg:p-12 overflow-hidden transition-transform duration-300 
      ${
        scheduleDisabled
          ? "pointer-events-none opacity-50"
          : "hover:scale-102 hover:drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]"
      } h-48`}
        >
          <img
            src="/static/images/ScheduleIcon.png"
            alt="Schedule"
            className="absolute -right-24 -bottom-8 -z-10 scale-50"
            />
          <h2 className="text-[30px] font-semibold">Schedule</h2>
          <p className="text-white-500">A list of fun events</p>
        </Link>
      </div>
    </>
  );
};

export default Home;
