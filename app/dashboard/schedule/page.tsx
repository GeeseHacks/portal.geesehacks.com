"use client";
import { useState, useEffect } from 'react';
import EventCard from '@/components/events/EventCard';
import { HackerEvent } from '@utils/types/HackerEvent';

const HOURS = Array.from({ length: 24 }, (_, i) => i); // Array [0, 1, ..., 23]

const SchedulePage: React.FC = () => {
  const [events, setEvents] = useState<HackerEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Saturday');

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      const fetchedEvents = data.map((event: HackerEvent) => ({
        ...event,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
      }));
      setEvents(fetchedEvents);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    event => event.startTime.getDay() === (selectedDay === 'Saturday' ? 6 : 0)
  );

  return (
    <>
      <div>
        <h1 className="text-4xl mt-5 mb-2">Schedule</h1>
        <p className="text-gray-500">When is the food dropping?</p>
      </div>

      <div className="bg-gradient-to-br text-white w-full h-full mb-4">
        {/* Day Tabs */}
        <div className="flex space-x-4 mb-6">
          {['Saturday', 'Sunday'].map(day => (
            <button
              key={day}
              className={`py-2 px-4 rounded-md text-sm ${selectedDay === day ? 'bg-purple-700' : 'bg-gray-600'
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
          hover:scale-102 transition-transform duration-300
          hover:drop-shadow-[0_0px_15px_rgba(48,133,159,0.5)]
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
          <div className="relative h-full">
            {/* Background Hour Lines */}

            {HOURS.map(hour => (
              <>
                {hour % 2 === 0 &&
                  <div
                    key={hour}
                    className="absolute left-0 flex-none w-32 text-center text-sm font-semibold text-gray-300"
                    style={{ top: `${hour * 4}rem` }}
                  >
                    {`${hour}:00`}
                  </div>}
                <div
                  key={hour}
                  className="absolute top-0 left-0 w-full border-t border-gray-500"
                  style={{ top: `${hour * 4}rem` }}
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
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
