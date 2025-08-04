import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";
import Brand from "../components/Brand";
import KoaButton from "../components/koa-ui/KoaButton";
import KoaTypography from "@/components/koa-ui/KoaTypography.tsx";

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
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(4),
  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
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

          <KoaTypography variant="h1" component="h1" color="inverted">
            Where journeys begin with a single click
          </KoaTypography>
          <KoaButton variant="secondary" onClick={onClick}>
            Get started
          </KoaButton>
        </motion.div>
      </Content>
    </StyledHero>
  );
};

export default HeroBanner;
