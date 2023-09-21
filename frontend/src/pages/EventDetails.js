import EventItem from "components/EventItem";
import { json, useLoaderData } from "react-router-dom";

function EventDetailsPage() {
  const event = useLoaderData();

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
