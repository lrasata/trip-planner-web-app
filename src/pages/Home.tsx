import CreateTripContainer from "../containers/CreateTripContainer";
import PlannedTripContainer from "../containers/PlannedTripContainer.tsx";
import Brand from "../components/Brand.tsx";
import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";
import HeroBanner from "../components/HeroBanner.tsx";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Home = () => {
  const { isAuthenticated } = useIsAuthenticated();
  const navigate = useNavigate();

  const handleHeroBannerOnClick = () => {
    navigate("/login");
  };

  return (
    <>
      {isAuthenticated ? (
        <Box my={8}>
          <Brand />
          <PlannedTripContainer />
          <CreateTripContainer />
        </Box>
      ) : (
        <HeroBanner onClick={handleHeroBannerOnClick} />
      )}
    </>
  );
};

export default Home;
