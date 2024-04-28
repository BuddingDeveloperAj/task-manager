import { RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Router from './router/Router';

function App() {
    return (
        <>
            <RouterProvider router={Router} />
            <ToastContainer />
        </>
    );
}

export default App;
