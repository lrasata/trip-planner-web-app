import { SearchBar, SearchBarProps } from "koa-ui-design-system";
import { ThemeProvider } from "@emotion/react";
import customTheme from "@/koa-theme/customTheme.ts";

const KoaSearchBar = (props: SearchBarProps) => {
  return (
    <ThemeProvider theme={customTheme}>
      <SearchBar {...props} />
    </ThemeProvider>
  );
};

export default KoaSearchBar;
