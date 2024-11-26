'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HackerEvent } from "@utils/types/HackerEvent";
import HTMLFlipBook from "react-pageflip";
import { useMediaQuery } from 'react-responsive';

const passportPage: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState<HackerEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(eventsData => {
        const filteredEvents = eventsData.filter((event: HackerEvent) => event.needsScanning);
        setEvents(filteredEvents);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false); // Ensure loading stops even on error
      });
  }, []);


  const flipBookProps = {
    width: 350,
    height: 500,
    size: 'fixed' as 'fixed' | 'stretch',
    minWidth: 250,
    maxWidth: 550,
    minHeight: 350,
    maxHeight: 800,
    drawShadow: true,
    flippingTime: 1000,
    usePortrait: false,
    startZIndex: 0,
    autoSize: true,
    maxShadowOpacity: 1,
    showCover: false,
    mobileScrollSupport: true,
    className: 'flip-book',
    style: {
      transform: isMobile ? 'scale(0.5)' : 'scale(1)'
    },
    startPage: 0,
    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 0,
    showPageCorners: true,
    disableFlipByClick: false,
    orientation: 'landscape',
    showDoublePage: true, // Enable double page display
    perspective: 2500
  };

  return <>
    <div>
      <h1 className="text-4xl mt-5 mb-2">Passport</h1>
      <p className="text-gray-500">See which events you've attended!</p>
    </div>

    <div className="bg-gradient-to-br text-white w-full h-full mb-4">
      <div className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-2 lg:p-8 rounded-xl w-full h-full
          relative
          flex flex-col items-center justify-center
          overflow-hidden
        ">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="">
            <HTMLFlipBook {...flipBookProps}>
              {/* Cover Pages (Left and Right) */}
              <div className="flex flex-col justify-center items-center bg-white text-center p-8">
                <h2 className="text-5xl font-bold mb-4 mt-16 text-gray-800" style={{ fontFamily: 'Just Another Hand, cursive' }}>GeeseHacks</h2>
                <h2 className="text-4xl font-bold mb-4 mt-2 text-gray-800" style={{ fontFamily: 'Just Another Hand, cursive' }}>2025</h2>
                <p className="text-gray-500 mt-24 font-semibold">Digital Passport</p>
              </div>

              <div className="flex flex-col justify-center items-center bg-white text-center p-8">
                <p className="text-gray-500 mt-28 font-semibold">Click or swipe to flip pages</p>
              </div>
              {/* Event Pages */}
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="page flex flex-col bg-white px-8 py-12 text-center h-full"
                >
                  {/* Icon */}
                  <img
                    src={`/static/icons/${event.eventType.toLowerCase()}.svg`}
                    alt={`${event.eventType} icon`}
                    className="mx-auto mb-4"
                    style={{ width: '100px', height: '100px' }} // Adjust size as needed
                  />

                  {/* Event Title */}
                  <h2
                    className="text-4xl font-medium text-gray-800 mb-4"
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

                  {/* Stamp */}
                  {/* <div className="w-20 h-20 border-4 border-dashed rounded-full flex items-center justify-center text-gray-400 my-4">
                    Stamp
                  </div> */}

                  {/* Spacer to push the footer to the bottom */}
                  <div className="flex-grow"></div>

                  {/* "GeeseHacks Passport" Aligned to Bottom */}
                  <p className="text-xs text-gray-400 mt-auto">GeeseHacks Passport</p>
                </div>
              ))}



              {/* Back Cover Pages */}
              <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8">
                <p className="text-gray-600 mt-32 text-3xl italic" style={{ fontFamily: 'Just Another Hand, cursive' }}>Thank you for participating!</p>
              </div>
              <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 mt-32">GeeseHacks 2024</h2>
                <p className="text-gray-500">See you next year!</p>
              </div>
            </HTMLFlipBook>
          </div>
        )}
      </div>
    </div>
  </>;
};

export default passportPage;