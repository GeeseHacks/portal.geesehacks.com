import React from 'react';
import EventCard from '@/components/events/EventCard';
import { HackerEvent } from '@utils/types/HackerEvent';

const events: HackerEvent[] = [
  {
    id: '1',
    title: 'Lunch Time',
    location: 'Cafeteria',
    date: new Date(2024, 8, 30, 11, 0), // 11:00 AM
    details: 'Enjoy some delicious food!',
  },
  {
    id: '2',
    title: 'Workshop',
    location: 'Room 204',
    date: new Date(2024, 8, 30, 13, 0), // 1:00 PM
    details: 'Learn how to build an app!',
  },
  {
    id: '3',
    title: 'Panel Discussion',
    location: 'Main Hall',
    date: new Date(2024, 8, 30, 15, 0), // 3:00 PM
    details: 'Listen to industry leaders.',
  },
  // Add more events as needed
];

const SchedulePage: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-800 to-indigo-900 min-h-screen text-white">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Schedule</h1>
      <h2 className="text-lg mb-8">When's the food dropping?</h2>

      {/* Day Tabs */}
      <div className="flex space-x-4 mb-6">
        <button className="bg-purple-700 py-2 px-4 rounded-md text-sm">Friday</button>
        <button className="bg-gray-600 py-2 px-4 rounded-md text-sm">Saturday</button>
        <button className="bg-gray-600 py-2 px-4 rounded-md text-sm">Sunday</button>
      </div>

      {/* Scrollable Timeline */}
      <div className="relative flex space-x-8 overflow-x-auto h-96">
        <div className="relative w-64">
          <div className="text-center mb-2">Friday</div>
          <div className="relative border-l-2 border-gray-400 h-full">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="relative w-64">
          <div className="text-center mb-2">Saturday</div>
          <div className="relative border-l-2 border-gray-400 h-full">
            {/* You can add Saturday's events similarly */}
          </div>
        </div>

        <div className="relative w-64">
          <div className="text-center mb-2">Sunday</div>
          <div className="relative border-l-2 border-gray-400 h-full">
            {/* You can add Sunday's events similarly */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
