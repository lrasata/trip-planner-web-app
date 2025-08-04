import { createTheme } from "koa-ui-design-system";
import { fonts } from "@/koa-theme/fonts.ts";
import { typography } from "@/koa-theme/typography.ts";

const customTheme = createTheme({
  colors: {
    primary: {
      main: "#4AA397",
      light: "#D2EAE4",
      dark: "#2E6E61",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#F1C55E", // Golden yellow (base)
      light: "#FAE6A1", // Lighter, soft pastel — for hover or highlights
      dark: "#C1983B", // Rich amber — for pressed or dark mode
      contrastText: "#1F2937", // Black text for readability (contrast ratio ≈ 11.9:1)
    },
    background: {
      default: "#F5F5F5",
      surface: "#FFFFFF", // ex: for Card background color
      hover: "#e5e7eb",
      press: "#e0e0e0",
      backdrop: "rgba(0, 0, 0, 0.4)",
    },
  },
  fonts,
  typography,
});

export default customTheme;
