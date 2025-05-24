import logo from "/trip-planner-logo.png";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Brand = ({ height = 350 }) => {
  return (
    <StyledBox>
      <img src={logo} alt="Trip planner logo" height={height} />
    </StyledBox>
  );
};

export default Brand;
