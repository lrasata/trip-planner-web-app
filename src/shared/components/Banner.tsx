import { Box, styled } from "@mui/material";
import React from "react";

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
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center", // center horizontally
  };
});

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(10),
}));

interface BannerProps {
  children?: React.ReactNode;
}
const Banner = ({ children }: BannerProps) => {
  return (
    <StyledBanner>
      <Content>{children}</Content>
    </StyledBanner>
  );
};

export default Banner;
