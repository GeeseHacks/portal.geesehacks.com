import React from 'react';
import { HackerEvent } from '@utils/types/HackerEvent';

type EventCardProps = {
  event: HackerEvent;
};

const getPosition = (startTime: Date) => {
  const hour = startTime.getHours();
  const minutes = startTime.getMinutes();
  return hour * 128 + (minutes / 60) * 128; // 128px per hour
};

const getHeight = (startTime: Date, endTime: Date) => {
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // Minutes
  return (duration / 60) * 128 - 5; // 128px per hour
};

// Define color mapping for event types
const getEventColor = (eventType: string) => {
  switch (eventType) {
    case 'Ceremonies':
      return 'bg-teal-400';
    case 'Activities':
      return 'bg-indigo-300';
    case 'Food':
      return 'bg-red-500';
    case 'Workshop':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500'; // Error color for unrecognized types
  }
};

// Define subtle background color shifts for the container
const getContainerBgColor = (eventType: string) => {
  return 'bg-slate-800';
  // switch (eventType) {
  //   case 'Ceremonies':
  //     return 'bg-teal-900';
  //   case 'Activities':
  //     return 'bg-indigo-900';
  //   case 'Food':
  //     return 'bg-red-900';
  //   case 'Workshop':
  //     return 'bg-purple-900';
  //   default:
  //     return 'bg-gray-800'; // Default background color shift for unrecognized types
  // }
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { name, startTime, endTime, location, details, eventType } = event;
  const eventColor = getEventColor(eventType);
  const containerBgColor = getContainerBgColor(eventType);

  return (
    <div
      className={`relative flex lg:ml-24 ml-0 lg:w-11/12 w-full hover:z-10 transition-transform duration-200`}
      style={{
        position: 'absolute',
        top: `${getPosition(startTime)}px`,
        height: `${getHeight(startTime, endTime)}px`,
      }}
    >
      {/* Colored bar */}
      <div className={`w-2 ${eventColor} rounded-l-lg`} />

      {/* Event details container with color shift */}
      <div
        className={` bg-opacity-65 hover:bg-opacity-100 flex-grow p-4 rounded-r-lg text-white shadow-xl hover:shadow-2xl transition-shadow duration-200 ${containerBgColor}`}
      >
        <p className="font-bold text-sm mb-1">{name}</p>
        <div className="flex justify-between text-xs">
          <span className="text-gray-300">{location}</span>
          <span>{`${details}`}</span>
        </div>
        <p className="text-xs mt-1">
          {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
          {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
