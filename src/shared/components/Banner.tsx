import { Box, styled } from "@mui/material";
import React from "react";

interface StyledBannerProps {
  imageUrl?: string;
}

const StyledBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imageUrl",
})<StyledBannerProps>(({ imageUrl }) => ({
  position: "absolute",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  width: "100vw",
  height: "45vh",
  backgroundImage: `url(${imageUrl || "/background.png"})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
}));

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(10),
}));

interface BannerProps {
  children?: React.ReactNode;
  imageUrl?: string;
}
const Banner = ({ children, imageUrl }: BannerProps) => {
  return (
    <StyledBanner imageUrl={imageUrl}>
      <Content>{children}</Content>
    </StyledBanner>
  );
};

export default Banner;
