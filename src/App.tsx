import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./pages/MainLayout";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement:<ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'all-trips',
                element: <></>,
            },
            {
                path: 'settings',
                element: <></>,
            },
            {
                path: 'task-category',
                element: <></>
            },

        ],
    }
]);

function App() {
    return (<RouterProvider router={router}/>)
}

export default App
