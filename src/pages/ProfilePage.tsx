import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";
import ProfileContainer from "../containers/ProfileContainer.tsx";

const ProfilePage = () => {
  const { user } = useIsAuthenticated();

  if (!user) return null;

  return (
    <ProfileContainer
      user={{
        fullName: user.fullName,
        email: user.email,
        role: user.role.name,
      }}
    />
  );
};

export default ProfilePage;
