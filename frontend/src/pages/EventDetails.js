import { useParams } from "react-router-dom";

function EventDetailsPage() {
  const params = useParams();

  return (
    <>
      <h1>This is from Event Details Page</h1>

      <p>{params.eventId}</p>
    </>
  );
}

export default EventDetailsPage;
