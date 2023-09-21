// import { useEffect, useState } from 'react';
import { json, useLoaderData } from "react-router-dom";
import EventsList from "components/EventsList";

function EventsPage() {
  const eventsList = useLoaderData();

  return (
    <>
      <div style={{ textAlign: "center" }}>
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
    return json({ message: "Couldn't fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}
