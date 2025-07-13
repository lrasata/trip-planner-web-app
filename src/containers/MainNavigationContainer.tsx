import DrawerAppBar from "../components/DrawerAppBar.tsx";
import { API_LOGOUT_ENDPOINT, APP_NAME } from "../constants/constants.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/redux/AuthSlice.ts";

const authNavItems = [
  {
    title: "All trips",
    url: "/trips",
  },
  {
    title: "Profile",
    url: "/profile",
  },
  { title: "Log out", url: "/logout" },
];

const nonAuthNavItems = [
  { title: "Sign up", url: "/login" },
  { title: "Log in", url: "/login" },
];

const MainNavigationContainer = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isAuthenticated } = useIsAuthenticated();
  const [menuContent, setMenuContent] = useState<
    { title: string; url: string }[]
  >([]);

  const handleOnClickNavigate = (href: string) => {
    navigate(href);
  };

  const handleOnClickLogout = async () => {
    await fetch(API_LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });

    navigate("/login");
    dispatch(authSliceActions.updateIsLoggedInState({ isLoggedIn: false }));
    dispatch(authSliceActions.clearTokens());
  };

  useEffect(() => {
    const addMenuItems = isAuthenticated ? authNavItems : nonAuthNavItems;

    setMenuContent([...addMenuItems]);
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
