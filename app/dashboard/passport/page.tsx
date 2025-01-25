"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HackerEvent } from "@utils/types/HackerEvent";

// 1) Import Just Another Hand from next/font/google
import { Just_Another_Hand } from "next/font/google";

// 2) Configure the font
const justAnotherHand = Just_Another_Hand({
  weight: "400",
  subsets: ["latin"],
});

const PassportPage: React.FC = () => {
  const { data: session } = useSession();
  const [allEvents, setAllEvents] = useState<HackerEvent[]>([]);
  const [events, setEvents] = useState<HackerEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    // Fetch user data
    fetch(`/api/users/${session.user.id}`)
      .then(res => res.json())
      .then(data => {
        const attendedEventIds = data.attendedEventIds || [];
        return attendedEventIds;
      })
      .then(attendedEventIds => {
        // Fetch all events
        fetch("/api/events")
          .then(res => res.json())
          .then(eventsData => {
            const allEventsData = eventsData.filter(
              (event: HackerEvent) => event.needsScanning
            );
            setAllEvents(allEventsData);

            const filteredEvents = allEventsData.filter((event: HackerEvent) =>
              attendedEventIds.includes(event.id)
            );
            setEvents(filteredEvents);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching events:", error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [session]);

  // Build your pages
  const allPages = [
    // Cover Page
    <div className="flex flex-col justify-center items-center bg-white text-center p-8 h-full">
      <h2 className={`${justAnotherHand.className} text-4xl font-bold mb-4 mt-16 text-gray-800`}>
        GeeseHacks
      </h2>
      <h2 className={`${justAnotherHand.className} text-3xl font-bold mb-4 mt-2 text-gray-800`}>
        2025
      </h2>
      <p className="text-gray-500 mt-24 font-semibold">Digital Passport</p>
    </div>,

    // Event Pages
    ...allEvents.map(event => (
      <div
        key={event.id}
        className="page flex flex-col justify-between bg-white text-center h-full p-4 rounded-xl shadow-lg"
      >
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Icon */}
          <img
            src={`/static/icons/${event.eventType.toLowerCase()}.svg`}
            alt={`${event.eventType} icon`}
            className="mx-auto mb-4"
            style={{ width: "60px", height: "60px" }}
          />

          {/* Event Title */}
          <h2 className={`${justAnotherHand.className} text-2xl font-medium text-gray-800 mb-4`}>
            {event.name}
          </h2>

          {/* Event Details */}
          <p className={`${justAnotherHand.className} text-xl text-gray-600 mb-2`}>
            {event.details}
          </p>
        </div>

        {/* Bottom Part */}
        <div className="flex flex-col items-center">
          {/* Stamp */}
          <div className="flex justify-center items-center w-full">
            {events.includes(event) ? (
              <img
                src="/static/images/geesestamp.png"
                alt="Stamp icon"
                className="w-28 mb-10"
              />
            ) : (
              <div className="w-20 h-20 mb-10 border-4 border-dashed rounded-full flex items-center justify-center text-gray-400 my-4"></div>
            )}
          </div>

          {/* Footer */}
          <p className={`${justAnotherHand.className} text-xs text-gray-400 mt-2`}>
            GeeseHacks Passport
          </p>
        </div>
      </div>
    )),

    // Back Cover
    <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8 h-full">
      <p className={`${justAnotherHand.className} text-gray-600 mt-32 text-3xl italic`}>
        Thank you for participating!
      </p>
    </div>,
    <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8 h-full">
      <h2 className={`${justAnotherHand.className} text-xl font-bold mb-4 text-gray-800 mt-32`}>
        GeeseHacks 2024
      </h2>
      <p className={`${justAnotherHand.className} text-gray-500`}>See you next year!</p>
    </div>,
  ];

  // Navigation
  const handleNext = () => {
    if (currentPage < allPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-4xl mt-5 mb-2">Passport</h1>
        <p className="text-gray-500">See which events you've attended!</p>
      </div>

      {/* Container */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full h-5/6 flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Left Page */}
            <div className="bg-gray-300 rounded-xl shadow-lg p-4 m-2 w-[300px] h-[400px]">
              {allPages[currentPage]}
            </div>

            {/* Right Page (hidden on small screens) */}
            <div className="hidden md:block bg-gray-300 rounded-xl shadow-lg p-4 m-2 w-[300px] h-[400px]">
              {allPages[currentPage + 1] || <div></div>}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className={`px-4 py-2 mx-2 rounded-lg bg-darkpurple text-white ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-darkteal"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage >= allPages.length - 1}
              className={`px-4 py-2 mx-2 rounded-lg bg-darkpurple text-white ${
                currentPage >= allPages.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-darkteal"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PassportPage;
