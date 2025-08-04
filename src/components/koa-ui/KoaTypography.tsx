import { Typography, TypographyProps } from "koa-ui-design-system";
import { ThemeProvider } from "@emotion/react";
import customTheme from "@/koa-theme/customTheme.ts";

const KoaTypography = (props: TypographyProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Typography {...props}>{props.children}</Typography>
    </ThemeProvider>
  );
};

export default KoaTypography;
