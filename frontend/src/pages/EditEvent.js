import EventForm from "components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

function EditEventPage() {
  const event = useRouteLoaderData("event-details");

  return (
    <>
      <EventForm event={event} />
    </>
  );
}

export default EditEventPage;
