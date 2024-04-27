import { useLocation } from 'react-router-dom';
import config from '../../configs/sidebar';

const Sidebar = () => {
    const location = useLocation();

    const path = location.pathname;
    return (
        <div className="flex flex-col min-w-52 border-r min-h-full bg-purple-100 border-gray-500/60">
            <ul className="text-sm w-full flex flex-col p-1 h-full">
                {config.map((obj) => {
                    const isMatch = path === obj.path;
                    return (
                        <li
                            key={obj.path}
                            className={`text-base m-1 p-2 rounded-md cursor-pointer flex  gap-2 pl-6 ${
                                isMatch
                                    ? 'bg-purple-300'
                                    : 'hover:bg-purple-200 border border-gray-400'
                            }`}
                        >
                            <img
                                src={obj.icon}
                                className="w-4 h-4 mt-1 flex"
                                alt={obj.label}
                            />
                            {obj.label}
                        </li>
                    );
                })}
                <li
                    className={`text-base m-1 p-2 rounded-md cursor-pointer flex  gap-2 pl-6 hover:bg-purple-200 mt-auto border border-gray-400`}
                >
                    <img
                        src="./assets/logout.svg"
                        className="w-4 h-4 mt-1 flex"
                        alt="Logout"
                    />
                    Log out
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
