import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner.tsx";
import LoginOrSignInPage from "./pages/LoginOrSignInPage.tsx";

const MainLayout = lazy(() => import("./pages/MainLayout.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const AllTrips = lazy(() => import("./pages/AllTrips.tsx"));
const EditTripPage = lazy(() => import("./pages/EditTripPage.tsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.tsx"));
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
            <LoginOrSignInPage />
          </Suspense>
        ),
      },
      {
        path: "all-trips",
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
        path: "profile",
        element: (
          <Suspense fallback={<Spinner />}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
