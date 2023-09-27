import EventItem from "components/EventItem";
import { json, useRouteLoaderData, redirect } from "react-router-dom";

function EventDetailsPage() {
  const event = useRouteLoaderData("event-details");

  return (
    <>
      <EventItem event={event} />
    </>
  );
}

export default EventDetailsPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    return json({ message: "Couldn't fetch details for selected event." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function action({ params, request }) {
  console.log("fetched");

  const id = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${id}`, { method: request.method });

  if (!response.ok) {
    return json({ message: "Couldn't delete event." }, { status: 500 });
  }

  return redirect("/events");
}
