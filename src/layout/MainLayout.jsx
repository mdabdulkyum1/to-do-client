import { Outlet } from "react-router";
import Navbar from './../components/Navbar/Navbar';


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;