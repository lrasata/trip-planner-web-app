import React from "react";
import { Box, Typography } from "@mui/material";

interface IconWithLabelProps {
  icon: React.ReactNode;
  label: string;
}

const IconWithLabel: React.FC<IconWithLabelProps> = ({ icon, label }) => {
  return (
    <Box display="flex" flexDirection="row">
      {icon}
      <Typography variant="body1" color="textSecondary">
        {label}
      </Typography>
    </Box>
  );
};

export default IconWithLabel;
