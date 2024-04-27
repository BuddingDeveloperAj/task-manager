import { Outlet } from 'react-router-dom';
import Sidebar from '../components/application/Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen max-h-screen flex flex-col">
            <div className="flex p-4 bg-purple-400/40">
                <p className="font-semibold text-lg">Task Manager</p>
            </div>
            <div className="flex flex-grow min-h-full max-h-full">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
