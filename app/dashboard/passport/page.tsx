'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const passportPage: React.FC = () => { 
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Fetch user data from db
    fetch(`/api/users/${session?.user?.id}`)
    .then(res => res.json())
    .then(data => {
      setUser(data); 
      setEvents(data.attendedEventIds)
    });
  }, [])

  // Next steps: 
  // - fetch events from spreadsheet (check "app/api/events/route.ts")
  // - Map the event IDs with the events fetched from the spreadsheet (those are the events the hacker attended)
  // - Do your UI magic

  return <div>
    Attended Events,
    {events.map(event => <div>{event}</div>)}
  </div>
}
export default passportPage;