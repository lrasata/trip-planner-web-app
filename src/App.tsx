import Brand from "./components/Brand.tsx";
import {Box, Container, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import CreateTripContainer from "./containers/CreateTripContainer.tsx";
import MainNavigationContainer from "./containers/MainNavigationContainer.tsx";
import PlannedTripContainer from "./containers/PlannedTripContainer.tsx";
import CreateTripContextProvider from "./store/CreateTripContext.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <ThemeProvider theme={theme}>
        <CreateTripContextProvider>
            <Container maxWidth="lg">
                <MainNavigationContainer />
                <Box sx={{ my: 4}}><Brand /></Box>
                <PlannedTripContainer />
                <CreateTripContainer />
            </Container>
        </CreateTripContextProvider>
        <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  )
}

export default App
