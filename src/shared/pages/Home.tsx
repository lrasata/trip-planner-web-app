import CreateTripContainer from "../../app/features/trip/containers/CreateTripContainer.tsx";
import PlannedTripContainer from "../../app/features/trip/containers/PlannedTripContainer.tsx";
import Brand from "../components/Brand.tsx";
import useIsAuthenticated from "../../app/features/auth/hooks/useIsAuthenticated.ts";
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
