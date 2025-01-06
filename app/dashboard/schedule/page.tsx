"use client";
import { useState, useEffect } from 'react';
import EventCard from '@/components/events/EventCard';
import { HackerEvent } from '@utils/types/HackerEvent';

const HOURS = Array.from({ length: 24 }, (_, i) => i); // Array [0, 1, ..., 23]

const SchedulePage: React.FC = () => {
  const [events, setEvents] = useState<HackerEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Saturday');
  // Loading state
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('All');



  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      const fetchedEvents = data.map((event: HackerEvent) => ({
        ...event,
        startTime: new Date(new Date(event.startTime).toLocaleString('en', { timeZone: 'America/Toronto' })),
        endTime: new Date(new Date(event.endTime).toLocaleString('en', { timeZone: 'America/Toronto' })),
      }));
      setEvents(fetchedEvents);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events
    .filter(event => event.startTime.getDay() === (selectedDay === 'Saturday' ? 6 : 0))
    .filter(event => filterType === 'All' || event.eventType === filterType);;


  return (
    <>
      <div>
        <h1 className="text-4xl mt-5 mb-2">Schedule</h1>
        <p className="text-gray-500">When is the food dropping?</p>
      </div>

      {/* Filter Dropdown */}
      <div className="flex items-center justify-start space-x-4 mb-4">
        <label className="text-white text-md font-semibold">Filter by Type:</label>
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="
        appearance-none
        px-4 py-2
        bg-[#1C1E29]
        text-white
        rounded-xl
        shadow-md
        focus:outline-none
        focus:ring-2
        focus:ring-[#A855F7]
        hover:bg-[#2A2C3A]
        transition-all
        cursor-pointer
      "
          >
            <option value="All">All</option>
            <option value="Ceremonies">Ceremonies</option>
            <option value="Activities">Activities</option>
            <option value="Food">Food</option>
            <option value="Workshop">Workshop</option>
          </select>
          {/* Custom Dropdown Arrow */}
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-[#A855F7]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br text-white w-full h-full mb-4">
        {/* Day Tabs */}
        <div className="flex space-x-4 mb-6">
          {['Saturday', 'Sunday'].map(day => (
            <button
              key={day}
              className={`py-2 px-4 rounded-md text-md ${selectedDay === day
                ? "text-[#D175FA] bg-[#3E2B65] font-semibold"
                : "text-white"
                }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timeline with Scrollable Content */}
        <div className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-8 lg:p-12 rounded-xl w-full h-5/6 space-y-4 
          relative
          flex flex-col justify-center
          overflow-x-scroll
        ">
          {/* THIS IS COMMENTED OUT BECAUSE ITS GIVING UNINTENDED BEHAVIOUR */}
          {/* Hour Annotations
          <div className="flex">
            {HOURS.map(hour => (
              <div
                key={hour}
                className="flex-none w-32 text-center text-sm font-semibold text-gray-300"
              >
                {`${hour}:00`}
              </div>
            ))}
          </div> */}

          {/* Gridlines and Events */}
          {loading ? <div>Loading...</div> :
            <div className="relative h-full">
              {/* Background Hour Lines */}

              {HOURS.map(hour => (
                <>
                  {hour % 2 === 0 &&
                    <div
                      key={hour}
                      className="absolute left-0 flex-none mt-2 w-32 text-center text-xs font-semibold text-gray-300"
                      style={{ top: `${hour * 128}px`, left: -40 }}
                    >
                      {`${hour}:00`}
                    </div>}
                  <div
                    key={hour}
                    className="absolute top-0 left-0 w-full border-t border-gray-500"
                    style={{ top: `${hour * 128}px` }}
                  />
                </>
              ))}

              {/* Events Positioned on Timeline */}
              <div className="relative">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
