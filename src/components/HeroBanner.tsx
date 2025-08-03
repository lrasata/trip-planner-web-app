import { Box, Typography, Button, styled } from "@mui/material";
import { motion } from "framer-motion";
import Brand from "../components/Brand";
import {Button as KoaButton, defaultTheme} from "koa-ui-design-system"
import { ThemeProvider } from "@emotion/react"

const StyledHero = styled(Box)(() => ({
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  width: "100vw",
  height: "100vh", // <-- full viewport height
  backgroundImage: "url('/background.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  textAlign: "center",
  display: "flex",
  flexDirection: "column", // vertical stacking
  justifyContent: "center", // center vertically
  alignItems: "center", // center horizontally
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.15)",
    zIndex: 1,
  },
}));

const Content = styled(Box)(() => ({
  position: "relative",
  zIndex: 2,
}));

const BrandWrapper = styled(Box)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(4),
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
}));

interface HeroBannerProps {
  onClick: () => void;
}

const HeroBanner = ({ onClick }: HeroBannerProps) => {
  return (
    <StyledHero>
      <Content>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <BrandWrapper>
            <Brand />
          </BrandWrapper>

          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 4, color: "white" }}
          >
            Where journeys begin with a single click
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onClick}
          >
            Get Started
          </Button>
          <ThemeProvider theme={defaultTheme}>
          <KoaButton>Button</KoaButton>
          </ThemeProvider>
        </motion.div>
      </Content>
    </StyledHero>
  );
};

export default HeroBanner;
