import { ThemeProvider } from "@emotion/react";
import customTheme from "@/koa-theme/customTheme.ts";
import { Button, ButtonProps } from "koa-ui-design-system";

const KoaButton = (props: ButtonProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Button {...props}>{props.children}</Button>
    </ThemeProvider>
  );
};

export default KoaButton;
