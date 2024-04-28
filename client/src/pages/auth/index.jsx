import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../configs/static/index';

const SIGN_IN_REQUIRED_FIELDS = ['email', 'password'];
const SIGN_UP_REQUIRED_FIELDS = ['email', 'password', 'first_name', 'role'];

const Auth = () => {
    const [roles, setRoles] = useState([]);
    const [payload, setPayload] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
    });
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getRoles() {
            const req_config = {
                method: 'GET',
                url: config.URL + '/roles',
            };

            const response = await axios(req_config);
            setRoles(response.data.data);
        }

        getRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        let required_fields = isSignIn
            ? SIGN_IN_REQUIRED_FIELDS
            : SIGN_UP_REQUIRED_FIELDS;

        for (let i of required_fields) {
            if (!payload[i]) {
                alert(`${i} field is mandatory for this operation`);
                return;
            }
        }

        let body = !isSignIn
            ? payload
            : { email: payload.email, password: payload.password };

        const req_config = {
            method: 'POST',
            url: config.URL + `/users/${isSignIn ? 'signin' : 'signup'}`,
            data: body,
        };

        try {
            let response = await axios(req_config);
            let data = response.data.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data?.role?.role_name);
            localStorage.setItem(
                'permissions',
                JSON.stringify(data?.role?.permissions)
            );
            localStorage.setItem('user', JSON.stringify(data?.user));

            toast.success(`${isSignIn ? 'Sign In' : 'Sign Up'} successful`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(`${isSignIn ? 'Sign In' : 'Sign Up'} Failed`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isSignIn
                            ? 'Sign in to your account'
                            : 'Create an account'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    {!isSignIn && (
                        <>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        id="first-name"
                                        name="first_name"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="First Name"
                                        value={payload.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="last-name"
                                        name="last_name"
                                        type="text"
                                        autoComplete="family-name"
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Last Name"
                                        value={payload.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={payload.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map((role) => (
                                        <option key={role._id} value={role._id}>
                                            {role.role_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={payload.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={payload.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button
                        type="button"
                        className="font-medium text-purple-600 hover:text-purple-500"
                        onClick={() => setIsSignIn(!isSignIn)}
                    >
                        {isSignIn
                            ? 'Create an account'
                            : 'Sign in to your account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
