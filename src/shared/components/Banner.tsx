import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

interface BannerProps {
  children?: React.ReactNode;
  imageUrl: string;
}

const StyledBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imageUrl",
})<{ imageUrl?: string }>(({ imageUrl, theme }) => ({
  position: "absolute",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  width: "100vw",
  height: "45vh",
  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
  backgroundColor: imageUrl ? "transparent" : theme.palette.background.default, // fallback
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

const Banner = ({ children, imageUrl }: BannerProps) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setIsValid(true);
    img.onerror = () => {
      console.warn(`⚠️ Failed to load banner image: ${imageUrl}`);
      setIsValid(false);
    };
  }, [imageUrl]);

  return (
    <StyledBanner imageUrl={isValid ? imageUrl : undefined}>
      <Content>
        {children}
        {!isValid && (
          <Typography
            color="textSecondary"
            sx={{
              textAlign: "center",
            }}
            my={2}
          >
            Unable to display image
          </Typography>
        )}
      </Content>
    </StyledBanner>
  );
};

export default Banner;
