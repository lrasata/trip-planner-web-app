import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "@/shared/components/Spinner.tsx";
import LoginOrSignInPage from "./app/features/auth/pages/LoginOrSignInPage.tsx";

const MainLayout = lazy(() => import("./shared/pages/MainLayout.tsx"));
const ErrorPage = lazy(() => import("./shared/pages/ErrorPage.tsx"));
const Home = lazy(() => import("./shared/pages/Home.tsx"));
const AllTrips = lazy(() => import("./app/features/trip/pages/AllTrips.tsx"));
const EditTripPage = lazy(
  () => import("./app/features/trip/pages/EditTripPage.tsx"),
);
const ProfilePage = lazy(
  () => import("./app/features/user-profile/pages/ProfilePage.tsx"),
);
const ProtectedRoute = lazy(
  () => import("./shared/containers/ProtectedRoute.tsx"),
);

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
