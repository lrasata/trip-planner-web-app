import CreateTripContainer from "../containers/CreateTripContainer";
import PlannedTripContainer from "../containers/PlannedTripContainer.tsx";
import Brand from "../components/Brand.tsx";

const Home = () => {
  return (
    <>
      <Brand />
      <PlannedTripContainer />
      <CreateTripContainer />
    </>
  );
};

export default Home;
