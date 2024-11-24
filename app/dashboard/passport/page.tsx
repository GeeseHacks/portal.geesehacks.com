'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HackerEvent } from "@utils/types/HackerEvent";
import HTMLFlipBook from "react-pageflip";

const passportPage: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState<HackerEvent[]>([]);
  const [loading, setLoading] = useState(true);

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
    width: 450, 
    height: 550, 
    size: 'fixed' as 'fixed' | 'stretch',
    minWidth: 0,
    maxWidth: 0,
    minHeight: 0,
    maxHeight: 0,
    drawShadow: true,
    flippingTime: 1000,
    usePortrait: false,
    startZIndex: 0,
    autoSize: false,
    maxShadowOpacity: 1,
    showCover: false,
    mobileScrollSupport: true,
    className: 'flip-book',
    style: {
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
          p-8 pt-12 lg:p-12 rounded-xl w-full h-[800px] 
          relative
          flex flex-col items-center justify-center
          overflow-hidden
        ">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className=""> {/* Scaling container to ensure fit */}
            <HTMLFlipBook {...flipBookProps}>
              {/* Cover Pages (Left and Right) */}
              <div className="page flex flex-col justify-center items-center bg-white text-center p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">GeeseHacks</h2>
                <p className="text-gray-500">Digital Passport</p>
              </div>
              <div className="page flex flex-col justify-center items-center bg-white text-center p-8">
                <p className="text-gray-500 italic">This passport belongs to:</p>
                {/* <h3 className="text-2xl text-gray-700 mt-4">{user?.name || 'Hacker'}</h3> */}
              </div>

              {/* Event Pages */}
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="page flex flex-col bg-white justify-between items-center px-8 py-6"
                >
                  <div className="w-full text-center">
                    <h2 className="text-2xl font-medium text-gray-800 mb-4">
                      {event.name}
                    </h2>
                    <p className="text-gray-600 mb-2">{event.details}</p>
                    <p className="text-gray-600 mb-2">{event.location}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <div className="w-20 h-20 border-4 border-dashed rounded-full flex items-center justify-center text-gray-400 my-4">
                    Stamp
                  </div>

                  <p className="text-sm text-gray-400">GeeseHacks Passport</p>
                </div>
              ))}

              {/* Back Cover Pages */}
              <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8">
                <p className="text-gray-600 italic">Thank you for participating!</p>
              </div>
              <div className="page flex flex-col justify-center items-center bg-gray-100 text-center p-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">GeeseHacks 2024</h2>
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