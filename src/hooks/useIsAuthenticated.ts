import { useEffect, useState } from "react";
import { API_USER_ENDPOINT } from "../constants/constants.ts";

interface IUserResponse {
  id: string;
  email: string;
  fullName: string;
  role: { name: string }[];
  tripIds: number[];
}

const useIsAuthenticated = () => {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_USER_ENDPOINT}me`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return {
    isAuthenticated: user !== null,
    user,
    loading,
  };
};

export default useIsAuthenticated;
