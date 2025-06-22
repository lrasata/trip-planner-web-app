import CreateTripContainer from "../containers/CreateTripContainer";
import PlannedTripContainer from "../containers/PlannedTripContainer.tsx";
import Brand from "../components/Brand.tsx";
import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";

const Home = () => {
  const { isAuthenticated } = useIsAuthenticated();

  return (
    <>
      <Brand />
      {isAuthenticated ? (
        <>
          <PlannedTripContainer />
          <CreateTripContainer />
        </>
      ) : (
        <>Not logged in.</>
      )}
    </>
  );
};

export default Home;
