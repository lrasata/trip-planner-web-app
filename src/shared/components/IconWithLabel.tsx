import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface IconWithLabelProps {
  icon: ReactNode;
  label: ReactNode;
}

const IconWithLabel: React.FC<IconWithLabelProps> = ({ icon, label }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default IconWithLabel;
