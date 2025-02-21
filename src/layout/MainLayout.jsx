import { Outlet } from "react-router";
import Navbar from './../components/Navbar/Navbar';


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="container mx-auto px-4">
            <Outlet></Outlet>
            </main>
        </div>
    );
};

export default MainLayout;