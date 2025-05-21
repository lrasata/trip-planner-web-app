import DrawerAppBar from "../components/DrawerAppBar.tsx";
import {APP_NAME} from "../constants/constants.ts";
import {useNavigate} from "react-router-dom";

const navItems = [{
    title: 'Home',
    url: '/',
}, {
    title: 'All trips',
    url: '/all-trips',
}, {
    title: 'Settings',
    url: '/settings',
}, {
    title: 'Log out',
    url: '/log-out',
}];

const MainNavigationContainer = () => {
    const navigate = useNavigate();

    const handleOnClickNavigate = (href: string) => {
        navigate(href);
    }

    const handleOnClickLogout = () => {
    };


    return (
        <DrawerAppBar appName={APP_NAME} navItems={navItems} handleOnClickNavigate={handleOnClickNavigate}
                      handleOnClickLogout={handleOnClickLogout}/>
    );
}

export default MainNavigationContainer;