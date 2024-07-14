import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { TripDetailsPage } from "./pages/trip-details";
import { CreateTripPage } from "./pages/create-trip";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripid",
    element: <TripDetailsPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />
}


