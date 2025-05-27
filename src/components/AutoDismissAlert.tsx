import { useEffect, useState } from "react";
import { Alert, AlertColor } from "@mui/material";

type AutoDismissAlertProps = {
  severity: AlertColor; // 'success' | 'error' | 'info' | 'warning'
  message: string;
  duration?: number; // optional: override default 10s
};

const AutoDismissAlert = ({
  severity,
  message,
  duration = 10000,
}: AutoDismissAlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return <Alert severity={severity}>{message}</Alert>;
};

export default AutoDismissAlert;
