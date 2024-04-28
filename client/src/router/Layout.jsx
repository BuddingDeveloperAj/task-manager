import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/application/Sidebar';

const Layout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        let rawUser = localStorage.getItem('user');
        let user = JSON.parse(rawUser);
        setUser(user);
        if (!token) {
            navigate('/auth');
        }
    }, []);

    if (!token) {
        return <></>;
    }

    return (
        <div className="min-h-screen max-h-full w-full flex flex-col ">
            <div className="flex p-3 bg-purple-400/40 justify-between">
                <p className="font-semibold text-lg">Task Manager</p>
                <p className="italic font-thin">Hello {user?.first_name}!</p>
            </div>
            <div className="flex flex-grow min-h-full w-full">
                <div className="w-[15%]">
                    <Sidebar />
                </div>
                <div className="w-[85%]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
