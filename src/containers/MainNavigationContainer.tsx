import DrawerAppBar from "../components/DrawerAppBar.tsx";
import { API_LOGOUT_ENDPOINT, APP_NAME } from "../constants/constants.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";
import { useCookies } from "react-cookie";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "All trips",
    url: "/trips",
  },
  {
    title: "Settings",
    url: "/settings",
  },
];

const MainNavigationContainer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useIsAuthenticated();
  const [menuContent, setMenuContent] = useState(navItems);
  // @ts-ignore
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleOnClickNavigate = (href: string) => {
    navigate(href);
  };

  const handleOnClickLogout = async () => {
    await fetch(API_LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
  };

  useEffect(() => {
    const authMenuItem = isAuthenticated
      ? { title: "Log out", url: "/logout" }
      : { title: "Log in", url: "/login" };

    setMenuContent((prevState) => {
      // Remove any existing auth-related item
      const filtered = prevState.filter(
        (item) => item.url !== "/login" && item.url !== "/logout",
      );

      return [...filtered, authMenuItem];
    });
  }, [isAuthenticated]);

  return (
    <DrawerAppBar
      appName={APP_NAME}
      navItems={menuContent}
      handleOnClickNavigate={handleOnClickNavigate}
      handleOnClickLogout={handleOnClickLogout}
    />
  );
};

export default MainNavigationContainer;
