import { Box, styled } from "@mui/material";

const StyledBanner = styled(Box)(() => {
  return {
    position: "absolute",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    width: "100vw",
    height: "45vh",
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  };
});

const Banner = () => {
  return <StyledBanner />;
};

export default Banner;
