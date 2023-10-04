import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetailsPage, { loader as eventDetailsLoader, action as deleteEventAction } from "pages/EventDetails";
import EventsPage, { loader as eventsLoader } from "pages/Events";
import HomePage from "pages/Home";
import NewEventPage from "pages/NewEvent";
import EditEventPage from "pages/EditEvent";
import RootLayout from "pages/Root";
import EventsRootLayout from "pages/EventsRoot";
import ErrorPage from "pages/Error";
import { action as manipulateEventAction } from "components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

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
              { index: true, element: <EventDetailsPage />, action: deleteEventAction },
              { path: "edit", element: <EditEventPage />, action: manipulateEventAction },
            ],
          },
          { path: "new", element: <NewEventPage />, action: manipulateEventAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App; 