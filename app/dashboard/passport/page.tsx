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
      console.log(data);
      setUser(data); 
      setEvents(data.attendedEventIds)
    });
  }, [])

  // Next steps: 
  // - fetch events from spreadsheet (check "app/api/events/route.ts")
  // - Map the event IDs with the events fetched from the spreadsheet (those are the events the hacker attended)
  // - Do your UI magic

  return <>
    <div>
      <h1 className="text-4xl mt-5 mb-2">Passport</h1>
      <p className="text-gray-500">See which events you've attended!</p>
    </div>

    <div className="bg-gradient-to-br text-white w-full h-full mb-4">
      <div className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-8 pt-12 lg:p-12 rounded-xl w-full h-5/6 space-y-4 
          relative
          flex flex-col justify-center
          overflow-x-scroll
        ">

        {events.map(event => <div>{event}</div>)}
      </div>
    </div>
  </>
}
export default passportPage;