import DrawerAppBar from "../components/DrawerAppBar.tsx";
import {APP_NAME} from "../constants/constants.ts";

const navItems = [{
    title: 'Home',
    url: '/',
}, {
    title: 'Menu 1',
    url: '/',
}, {
    title: 'Menu 2',
    url: '/',
}, {
    title: 'Menu 3',
    url: '/',
}, {
    title: 'Log out',
    url: '/log-out',
}];
const MainNavigationContainer = () => {
    // const navigate = useNavigate();

    const handleOnClickNavigate = (href: string)=> {
        // navigate(href);
    }

    const handleOnClickLogout = () => {
    };


    return (
        <DrawerAppBar appName={APP_NAME} navItems={navItems} handleOnClickNavigate={handleOnClickNavigate} handleOnClickLogout={handleOnClickLogout}/>
    );
}

export default MainNavigationContainer;