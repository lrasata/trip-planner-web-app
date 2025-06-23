import { useEffect, useState } from "react";
import { API_USER_ENDPOINT } from "../constants/constants.ts";
import { useSelector } from "react-redux";

interface IUserResponse {
  id: string;
  email: string;
  fullName: string;
  role: { name: string }[];
  tripIds: number[];
}

const useIsAuthenticated = () => {
  // @ts-ignore
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

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
  }, [isAuthenticated]);

  return {
    isAuthenticated: user !== null,
    user,
    loading,
  };
};

export default useIsAuthenticated;
