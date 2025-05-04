import Brand from "./components/Brand.tsx";
import {Box, Container, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import CreateTripContainer from "./containers/CreateTripContainer.tsx";
import MainNavigationContainer from "./containers/MainNavigationContainer.tsx";
import PlannedTripContainer from "./containers/PlannedTripContainer.tsx";

function App() {

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
            <MainNavigationContainer />
            <Box sx={{ my: 4}}><Brand /></Box>
            <PlannedTripContainer />
            <CreateTripContainer />
        </Container>
    </ThemeProvider>
  )
}

export default App
