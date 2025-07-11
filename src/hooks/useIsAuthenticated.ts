import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthenticatedUser } from "../store/redux/AuthSlice.ts";
import { AppDispatch, RootState } from "../store/redux";

const useIsAuthenticated = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );
  const authenticatedUser = useSelector(
    (state: RootState) => state.auth.authenticatedUser,
  );

  useEffect(() => {
    if (isAuthenticated && !authenticatedUser) {
      dispatch(fetchAuthenticatedUser());
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    user: authenticatedUser,
  };
};

export default useIsAuthenticated;
