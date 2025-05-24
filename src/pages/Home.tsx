import { Box } from "@mui/material";
import CreateTripContainer from "../containers/CreateTripContainer";
import PlannedTripContainer from "../containers/PlannedTripContainer.tsx";
import CreateTripContextProvider from "../store/context/CreateTripContext.tsx";
import Brand from "../components/Brand.tsx";

const Home = () => {
  return (
    <CreateTripContextProvider>
      <Box sx={{ my: 4 }}>
        <Brand />
      </Box>
      <PlannedTripContainer />
      <CreateTripContainer />
    </CreateTripContextProvider>
  );
};

export default Home;
