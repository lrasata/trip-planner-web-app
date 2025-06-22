import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const MainLayout = lazy(() => import("./pages/MainLayout.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const AllTrips = lazy(() => import("./pages/AllTrips.tsx"));
const EditTripPage = lazy(() => import("./pages/EditTripPage.tsx"));
const ProtectedRoute = lazy(() => import("./containers/ProtectedRoute.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Spinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "trips",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute>
              <AllTrips />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "trips/:id",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute>
              <EditTripPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: <></>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
