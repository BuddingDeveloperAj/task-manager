import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/home';
import Auth from '../pages/auth';
import ConfirmationModal from '../components/modal/ConfirmationModal';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ],
    },
    {
        path: '/auth',
        element: <Auth />,
    },
]);

export default Router;
