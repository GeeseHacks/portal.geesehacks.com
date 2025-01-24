'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HackerEvent } from "@utils/types/HackerEvent";
// Removed: import HTMLFlipBook from "react-pageflip";
import { useMediaQuery } from 'react-responsive';
import useBetterMediaQuery from "@utils/betterMediaQuery";

const PassportPage: React.FC = () => {
  const { data: session } = useSession();
  const [allEvents, setAllEvents] = useState<HackerEvent[]>([]);
  const [events, setEvents] = useState<HackerEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Determine if the device is mobile
  const isMobile = useBetterMediaQuery('(max-width: 768px)' );

  // Track the current page index
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
        // console.log("User Data:", data);
        const attendedEventIds = data.attendedEventIds || [];
        return attendedEventIds;
      })
      .then((attendedEventIds) => {
        // Fetch all events
        fetch('/api/events')
          .then(res => res.json())
          .then(eventsData => {
            const allEventsData = eventsData.filter((event: HackerEvent) => event.needsScanning);
            setAllEvents(allEventsData);
            const filteredEvents = allEventsData.filter((event: HackerEvent) => attendedEventIds.includes(event.id));
            setEvents(filteredEvents);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching events:", error);
            setLoading(false); // Ensure loading stops even on error
          });
        // console.log("Attended Event IDs:", attendedEventIds);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [session]);

  // Define all pages of the passport
  const allPages = [

    // Cover Page 1
    <div className="flex flex-col justify-center items-center bg-white text-center p-8 h-full">
      <h2 className="text-5xl font-bold mb-4 mt-16 text-gray-800" style={{ fontFamily: 'Just Another Hand, cursive' }}>GeeseHacks</h2>
      <h2 className="text-4xl font-bold mb-4 mt-2 text-gray-800" style={{ fontFamily: 'Just Another Hand, cursive' }}>2025</h2>
      <p className="text-gray-500 mt-24 font-semibold">Digital Passport</p>
    </div>,

    // Event Pages
    ...allEvents.map((event) => (
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
            style={{ width: '80px', height: '80px' }}
          />
          {/* Event Title */}
          <h2
            className="text-3xl font-medium text-gray-800 mb-4"
            style={{ fontFamily: 'Just Another Hand, cursive' }}
          >
            {event.name}
          </h2>
          {/* Event Details */}
          <p
            className="text-2xl text-gray-600 mb-2"
            style={{ fontFamily: 'Just Another Hand, cursive' }}
          >
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
              <div className="w-20 h-20 mb-10 border-4 border-dashed rounded-full flex items-center justify-center text-gray-400 my-4">
                
              </div>
            )}
          </div>
          {/* Footer */}
          <p className="text-xs text-gray-400 mt-2" style={{ fontFamily: 'Just Another Hand, cursive' }}>GeeseHacks Passport</p>
        </div>
      </div>
    )),

    // Back Cover Pages
    <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8 h-full">
      <p className="text-gray-600 mt-32 text-3xl italic" style={{ fontFamily: 'Just Another Hand, cursive' }}>Thank you for participating!</p>
    </div>,
    <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8 h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 mt-32" style={{ fontFamily: 'Just Another Hand, cursive' }}>GeeseHacks 2024</h2>
      <p className="text-gray-500" style={{ fontFamily: 'Just Another Hand, cursive' }}>See you next year!</p>
    </div>,
  ];

  // Responsive sizing for pages
  const pageWidth = isMobile ? 'w-[250px]' : 'w-[350px]';
  const pageHeight = isMobile ? 'h-[400px]' : 'h-[450px]';

  // Handle Next Page
  const handleNext = () => {
    if (isMobile) {
      if (currentPage < allPages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage + 2 < allPages.length) {
        setCurrentPage(currentPage + 2);
      }
    }
  };

  // Handle Previous Page
  const handlePrevious = () => {
    if (isMobile) {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      if (currentPage - 2 >= 0) {
        setCurrentPage(currentPage - 2);
      }
    }
  };

  return (
    <>
      {/* Header */}
      <div>
        <h1 className="text-4xl mt-5 mb-2">Passport</h1>
        <p className="text-gray-500">See which events you've attended!</p>
      </div>

      {/* Flipbook Container */}
      <div className="">
        <div
          className="
              bg-gradient-to-r from-darkpurple to-darkteal 
              p-2 lg:p-8 rounded-xl w-full h-full
              relative
              flex flex-col items-center justify-center
              overflow-hidden
              
            "
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              {/* Pages */}
              <div
                className={`w-full h-full flex ${
                  isMobile ? 'flex-col' : 'flex-row'
                } justify-center items-center`}
              >
                {/* Single Page for Mobile */}
                {isMobile ? (
                  <div
                    className={`bg-gray-300 rounded-xl shadow-lg p-4 ${pageWidth} ${pageHeight} font-just-another-hand`}
                  >
                    {allPages[currentPage]}
                  </div>
                ) : (
                  /* Two Pages Side-by-Side for Desktop */
                  <div className="flex">
                    {/* Left Page */}
                    <div
                      className={`bg-gray-300 rounded-xl shadow-lg p-4 mr-4 ${pageWidth} ${pageHeight} font-just-another-hand`}
                    >
                      {allPages[currentPage]}
                    </div>
                    {/* Right Page */}
                    <div
                      className={`bg-gray-300 rounded-xl shadow-lg p-4 ${pageWidth} ${pageHeight} font-just-another-hand`}
                    >
                      {allPages[currentPage + 1] || <div className={`${pageWidth} ${pageHeight}`}></div>}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center mt-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  className={`px-4 py-2 mx-2 rounded-lg bg-darkpurple text-white ${
                    currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darkteal'
                  }`}
                >
                  Previous
                </button>
                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={
                    isMobile
                      ? currentPage >= allPages.length - 1
                      : currentPage >= allPages.length - 2
                  }
                  className={`px-4 py-2 mx-2 rounded-lg bg-darkpurple text-white ${
                    (isMobile && currentPage >= allPages.length - 1) ||
                    (!isMobile && currentPage >= allPages.length - 2)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-darkteal'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PassportPage;
