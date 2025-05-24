import React from "react";
import { Box, Typography } from "@mui/material";

interface IconWithLabelProps {
  icon: React.ReactNode;
  label: string;
}

const IconWithLabel: React.FC<IconWithLabelProps> = ({ icon, label }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-end">
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon}
        <Typography variant="body1" color="textSecondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default IconWithLabel;
