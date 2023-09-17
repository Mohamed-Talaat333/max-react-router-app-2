// import { useEffect, useState } from 'react';
import { useLoaderData } from "react-router-dom";
import EventsList from 'components/EventsList';

function EventsPage() {
  const eventsList = useLoaderData();

  // console.log(eventsList);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
      </div>

      {/* {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}

      <EventsList events={eventsList} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // setError("Fetching events failed.");
  } else {
    const resData = await response.json();
    return resData.events;
  }
}