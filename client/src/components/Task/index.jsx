import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import { useState } from 'react';
import ConfirmationModal from '../modal/ConfirmationModal';
import { toast } from 'react-toastify';
import config from '../../configs/static';
import CreateTask from '../modal/CreateTask';
dayjs.extend(relativeTime);

const Task = ({
    task = {},
    provided,
    permissions,
    token,
    getStatuses,
    columns,
}) => {
    const {
        title = '',
        description = '',
        assigned_to: { first_name = '', last_name = '' } = {},
        createdAt = '',
    } = task;
    const [isDeleteModalOpen, setDeleteModal] = useState(false);
    const [isEditModalOpen, setEditModal] = useState(false);

    const isDraggable =
        permissions.findIndex(
            (perm) => perm.type === 'TASK' && perm.action === 'STATUS_UPDATE'
        ) > -1;

    const canEdit =
        permissions.findIndex(
            (perm) => perm.type === 'TASK' && perm.action === 'UPDATE'
        ) > -1;

    const canDelete =
        permissions.findIndex(
            (perm) => perm.type === 'TASK' && perm.action === 'DELETE'
        ) > -1;

    const handleDelete = async () => {
        let req_config = {
            method: 'DELETE',
            url: config.URL + `/tasks/${task._id}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        try {
            await axios(req_config);
            toast.success(`Task Deleted Successfully`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
            getStatuses(token);
        } catch (error) {
            toast.error(error.message, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
        }
    };

    return (
        <div
            className="w-full bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div
                className={`w-full flex flex-col gap-3 ${
                    isDraggable ? 'cursor-grab' : ''
                }`}
            >
                <div className="w-full flex items-start flex-col gap-0">
                    <span className="text-[15.5px] font-medium text-[#555]">
                        {title}
                    </span>
                    <span className="text-[13.5px] text-gray-500">
                        {description}
                    </span>
                </div>
                <div className="w-full border border-separate"></div>
                <div className="w-full flex justify-between">
                    <div className="text-[10px] flex gap-1 text-gray-700">
                        <img
                            className="w-3"
                            src="/assets/time.svg"
                            alt="clock"
                        />{' '}
                        <span>{dayjs(createdAt).fromNow()}</span>
                    </div>
                    <div className="text-[10px] flex gap-2 text-gray-700">
                        <span>
                            {first_name} {last_name}
                        </span>
                        <img
                            className="w-3"
                            src="/assets/person.svg"
                            alt="clock"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-2">
                {canDelete && (
                    <button
                        type="button"
                        className="text-[10px] p-1 rounded-md hover:bg-gray-200"
                        onClick={() => setDeleteModal(true)}
                    >
                        <img
                            className="w-3"
                            src="/assets/bin.svg"
                            alt="delete"
                        />
                    </button>
                )}
                {canEdit && (
                    <button
                        type="button"
                        className="text-[10px] p-1 rounded-md hover:bg-gray-200"
                        onClick={() => setEditModal(true)}
                    >
                        <img
                            className="w-3"
                            src="/assets/edit.svg"
                            alt="edit"
                        />
                    </button>
                )}
            </div>
            {canDelete && isDeleteModalOpen && (
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModal(false)}
                    onConfirm={handleDelete}
                    isEdit={true}
                    title="Delete Confirmation"
                    description="Are you sure you want to delete this task?"
                />
            )}
            {canEdit && isEditModalOpen && (
                <CreateTask
                    setShowModal={setEditModal}
                    body={{
                        title: task.title,
                        description: task.description,
                        assigned_to: task.assigned_to._id,
                        status: task.status,
                    }}
                    allStatus={columns.map((col) => ({
                        _id: col._id,
                        name: col.name,
                    }))}
                    isEdit={true}
                    token={token}
                    getStatuses={getStatuses}
                    task_id={task._id}
                />
            )}
        </div>
    );
};

export default Task;
