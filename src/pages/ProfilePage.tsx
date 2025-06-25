import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";
import ProfileContainer from "../containers/ProfileContainer.tsx";
import { ToastContainer } from "react-toastify";

const ProfilePage = () => {
  const { user } = useIsAuthenticated();

  if (!user) return null;

  return (
    <>
      <ProfileContainer
        user={{
          fullName: user.fullName,
          email: user.email,
        }}
      />
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
