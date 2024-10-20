import React from 'react';
import { HackerEvent } from '@utils/types/HackerEvent';

type EventCardProps = {
  event: HackerEvent;
};

const getPosition = (startTime: Date) => {
  const hour = startTime.getHours();
  const minutes = startTime.getMinutes();
  console.log(hour * 128 + (minutes / 60) * 128);
  return (hour * 128 + (minutes / 60) * 128); // 128px per hour
};

const getHeight = (startTime: Date, endTime: Date) => {
  const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // Minutes
  return (duration / 60) * 128 - 5; // 128px per hour
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { name, startTime, endTime, location, details } = event;

  return (
    <div
      className="bg-purple-500 p-4 border-2 border-solid border-purple-400 rounded-lg w-full text-white hover:z-10"
      style={{
        position: 'absolute',
        top: `${getPosition(startTime)}px`,
        height: `${getHeight(startTime, endTime)}px`,
      }}
    >
      <p className="font-bold">{name}</p>
      <p className="text-xs">{location}</p>
      <p className="text-xs">
        {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
        {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
      <p className="text-xs">{details}</p>
    </div>
  );
};

export default EventCard;
