import React from 'react';
import { HackerEvent } from '@utils/types/HackerEvent';

type EventCardProps = {
  event: HackerEvent;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="absolute bg-purple-500 p-4 rounded-lg w-40 left-0" style={{ top: `${event.date.getHours() * 10}px` }}>
      <p className="font-bold">{event.title}</p>
      <p className="text-xs">{event.location}</p>
      <p className="text-xs">{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p className="text-xs">{event.details}</p>
    </div>
  );
};

export default EventCard;
