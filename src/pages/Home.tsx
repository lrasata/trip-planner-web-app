import CreateTripContainer from "../containers/CreateTripContainer";
import PlannedTripContainer from "../containers/PlannedTripContainer.tsx";
import CreateTripContextProvider from "../store/context/CreateTripContext.tsx";
import Brand from "../components/Brand.tsx";

const Home = () => {
  return (
    <CreateTripContextProvider>
      <Brand />
      <PlannedTripContainer />
      <CreateTripContainer />
    </CreateTripContextProvider>
  );
};

export default Home;
