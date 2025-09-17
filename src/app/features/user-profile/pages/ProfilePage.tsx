import useIsAuthenticated from "../../auth/hooks/useIsAuthenticated.ts";
import ProfileContainer from "../containers/ProfileContainer.tsx";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { IRole } from "@/types.ts";
import api from "@/shared/api/api.ts";
import { API_BACKEND_URL } from "@/shared/constants/constants.ts";

const ProfilePage = () => {
  const { user } = useIsAuthenticated();
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    // Only fetch if user is present
    if (!user) return;

    const fetchUserRoles = async () => {
      try {
        // Replace with your real API endpoint
        const response = await api.get(`${API_BACKEND_URL}/roles`, {
          withCredentials: true,
        });

        const data: IRole[] = response.data;
        setRoles(data);
      } catch (error) {
        console.error("Error fetching Roles ", error);
      }
    };

    fetchUserRoles();
  }, [user]);

  if (!user) return null;

  return (
    <>
      <ProfileContainer
        user={{
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        }}
        roles={roles}
      />
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
