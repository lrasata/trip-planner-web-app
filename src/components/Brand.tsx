import logo from '../assets/trip-planner-logo.png';
import {Box, styled} from "@mui/material";

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Brand = ({height = 300}) => {
    return <StyledBox>
        <img src={logo} alt="Trip planner logo" height={height}/>
    </StyledBox>
}

export default Brand;