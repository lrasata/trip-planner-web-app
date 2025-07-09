import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthenticatedUser } from "../store/redux/AuthSlice.ts";
import { RootState } from "../store/redux";

const useIsAuthenticated = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  // @ts-ignore
  const authenticatedUser = useSelector(
    (state: RootState) => state.auth.authenticatedUser,
  );

  useEffect(() => {
    if (isAuthenticated && !authenticatedUser) {
      // @ts-ignore
      dispatch(fetchAuthenticatedUser());
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    user: authenticatedUser,
  };
};

export default useIsAuthenticated;
