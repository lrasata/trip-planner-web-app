import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner.tsx";

const MainLayout = lazy(() => import("./pages/MainLayout.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const AllTrips = lazy(() => import("./pages/AllTrips.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <MainLayout />{" "}
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Spinner />}>
        {" "}
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />{" "}
          </Suspense>
        ),
      },
      {
        path: "all-trips",
        element: (
          <Suspense fallback={<Spinner />}>
            {" "}
            <AllTrips />{" "}
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: <></>,
      },
      {
        path: "task-category",
        element: <></>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
