import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetailsPage, { loader as eventDetailsLoader, action as deleteEventAction } from "pages/EventDetails";
import EventsPage, { loader as eventsLoader } from "pages/Events";
import HomePage from "pages/Home";
import NewEventPage, { action as newEventAction } from "pages/NewEvent";
import EditEventPage from "pages/EditEvent";
import RootLayout from "pages/Root";
import EventsRootLayout from "pages/EventsRoot";
import ErrorPage from "pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            path: "",
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-details",
            loader: eventDetailsLoader,
            children: [
              { path: "", element: <EventDetailsPage />, action: deleteEventAction },
              { path: "edit", element: <EditEventPage /> },
            ],
          },
          { path: "new", element: <NewEventPage />, action: newEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
