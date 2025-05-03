import Brand from "./components/Brand.tsx";
import {Container, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import CreateTripContainer from "./containers/CreateTripContainer.tsx";

function App() {

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
            <Brand />
            <CreateTripContainer />
        </Container>
    </ThemeProvider>
  )
}

export default App
