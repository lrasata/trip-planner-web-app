import { Dialog, DialogProps } from "koa-ui-design-system";
import { ThemeProvider } from "@emotion/react";
import customTheme from "@/koa-theme/customTheme.ts";

const KoaDialog = (props: DialogProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Dialog {...props}>{props.children}</Dialog>
    </ThemeProvider>
  );
};

export default KoaDialog;
