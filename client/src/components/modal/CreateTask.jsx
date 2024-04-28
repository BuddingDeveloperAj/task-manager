import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../configs/static';
import { toast } from 'react-toastify';

export default function CreateTask({
    setShowModal,
    body,
    allStatus,
    token,
    getStatuses,
    isEdit = false,
    task_id = '',
}) {
    const [payload, setPayload] = useState(body);
    const [users, setUsers] = useState([]);

    async function getUsers(token) {
        try {
            let req_config = {
                method: 'GET',
                url: config.URL + '/users',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };

            const response = await axios(req_config);
            let users_data = response.data.data;

            setUsers(users_data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers(token);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayload({ ...payload, [name]: value });
    };

    const createOrUpdateTask = async () => {
        try {
            Object.entries(payload).forEach(([key, value]) => {
                if (!value) {
                    toast.error(`${key} is mandatory`, {
                        position: 'bottom-right',
                        autoClose: 5000,
                        draggable: true,
                        theme: 'light',
                    });
                }
                return;
            });

            let req_config = {
                method: isEdit ? 'PUT' : 'POST',
                url: config.URL + `${isEdit ? `/tasks/${task_id}` : '/tasks'}`,
                headers: {
                    authorization: `Bearer ${token}`,
                },
                data: payload,
            };

            try {
                await axios(req_config);
                getStatuses(token);
                toast.success(
                    `${
                        isEdit
                            ? 'Task updated successfully'
                            : 'Task created successfully'
                    }`,
                    {
                        position: 'bottom-right',
                        autoClose: 5000,
                        draggable: true,
                        theme: 'light',
                    }
                );
            } catch (error) {
                toast.error(`${error?.response?.data?.message}`, {
                    position: 'bottom-right',
                    autoClose: 5000,
                    draggable: true,
                    theme: 'light',
                });
            }
            setShowModal(false);
        } catch (error) {
            toast.error(`${error.message}`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
        }
    };

    return (
        <>
            <div className="justify-center items-center flex fixed inset-0 z-50 ">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Create Task
                            </h3>
                            <button onClick={() => setShowModal(false)}>
                                <img
                                    src="/assets/close.svg"
                                    className="w-5 flex mt-2"
                                    alt="close"
                                />
                            </button>
                        </div>

                        {/*body*/}
                        <form className="w-[500px] px-6 mt-5">
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-semibold"
                                    htmlFor="title"
                                >
                                    Title<span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    type="text"
                                    id="title"
                                    name="title"
                                    onChange={handleChange}
                                    value={payload.title}
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-semibold"
                                    htmlFor="description"
                                >
                                    Description
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                                    id="description"
                                    onChange={handleChange}
                                    value={payload.description}
                                    name="description"
                                    rows="3"
                                    placeholder="Enter description"
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-semibold"
                                    htmlFor="assigned_to"
                                >
                                    Assigned To
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    id="assigned_to"
                                    name="assigned_to"
                                    onChange={handleChange}
                                    value={payload.assigned_to}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.first_name} {user.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-sm font-semibold"
                                    htmlFor="status"
                                >
                                    Status
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    id="status"
                                    name="status"
                                    onChange={handleChange}
                                    value={payload.status}
                                >
                                    <option value="">Select Status</option>
                                    {allStatus.map((status) => (
                                        <option
                                            key={status._id}
                                            value={status._id}
                                        >
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-2">
                            <button
                                className="w-46 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-46 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                                type="button"
                                onClick={createOrUpdateTask}
                            >
                                {isEdit ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
