import { TextField, TextFieldProps } from "koa-ui-design-system";
import { ThemeProvider } from "@emotion/react";
import customTheme from "@/koa-theme/customTheme.ts";

const KoaTextField = (props: TextFieldProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <TextField {...props} />
    </ThemeProvider>
  );
};

export default KoaTextField;
