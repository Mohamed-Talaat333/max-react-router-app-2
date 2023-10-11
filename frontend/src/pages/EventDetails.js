import EventItem from "components/EventItem";
import { Suspense } from "react";
import EventsList from "components/EventsList";
import { json, useRouteLoaderData, redirect, defer, Await } from "react-router-dom";

function EventDetailsPage() {
  const { eventDetails, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense fallback={<p style={{textAlign: "center"}}>Loading event details ...</p>}>
        <Await resolve={eventDetails}>{(loadedEventDetails) => <EventItem event={loadedEventDetails} />}</Await>
      </Suspense>

      <Suspense fallback={<p style={{textAlign: "center"}}>Loading events ...</p>}>
        <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
      </Suspense>
    </>
  );
}

export default EventDetailsPage;

async function loadEventDetails(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    return json({ message: "Couldn't fetch details for selected event." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json({ message: "Couldn't fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ params }) {
  const eventId = params.eventId;

  return defer({
    eventDetails: await loadEventDetails(eventId),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;

  console.log(eventId);

  const response = await fetch("http://localhost:8080/events/" + eventId, { method: request.method });

  if (!response.ok) {
    throw json({ message: "Couldn't delete event." }, { status: 500 });
  }

  return redirect("/events");
}
