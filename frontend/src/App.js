import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetailsPage from "pages/EventDetails";
import EventsPage from "pages/Events";
import HomePage from "pages/Home";
import NewEventPage from "pages/NewEvent";
import EditEventPage from "pages/EditEvent";
import RootLayout from "pages/Root";
import EventsRootLayout from "pages/EventsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            path: "",
            element: <EventsPage />,
            loader: async function() {
              const response = await fetch("http://localhost:8080/events");

              if (!response.ok) {
                // setError("Fetching events failed.");
              } else {
                const resData = await response.json();
                return resData;
                // setFetchedEvents(resData.events);
              }
            },
          },
          { path: ":eventId", element: <EventDetailsPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
