import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import Task from '../../components/Task';
import axios from 'axios';
import onDragEndFunction from '../../utils/onDragEndFunction';
import config from '../../configs/static/index';
import { toast } from 'react-toastify';
import CreateTask from '../../components/modal/CreateTask';

const Home = () => {
    const [columns, setColumns] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState('');
    const [isTaskModalOpen, setTaskModal] = useState(false);
    const [permissions, setPermissions] = useState(false);
    const [token, setToken] = useState('');

    async function getStatuses(token) {
        try {
            let req_config = {
                method: 'get',
                url: config.URL + '/statuses',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };

            const response = await axios(req_config);
            setColumns(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error(`${error.response.data.message}`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
        }
    }

    useEffect(() => {
        let token_id = localStorage.getItem('token');
        setToken(token_id);

        getStatuses(token_id);

        let rawPermissions = localStorage.getItem('permissions');
        let permissions = JSON.parse(rawPermissions);

        setPermissions(permissions);
    }, []);

    return (
        <div className="h-full w-full">
            <DragDropContext
                onDragEnd={(result) =>
                    onDragEndFunction(
                        result,
                        token,
                        getStatuses,
                        columns,
                        setColumns
                    )
                }
            >
                <div className="flex items-start px-5 py-3 gap-5 w-full overflow-x-auto">
                    {columns.map((column) => (
                        <div
                            className="flex max-h-[90vh] flex-col rounded-lg p-2 container-with-scrollbar"
                            key={column._id}
                            style={{ backgroundColor: column.board_color }}
                        >
                            <div className="flex items-center justify-center py-2 my-2 w-full bg-white rounded-lg shadow-sm text-gray-600 font-medium">
                                {column.name}
                            </div>
                            <Droppable
                                droppableId={column._id}
                                key={column._id}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col overflow-y-scroll h-[68vh] w-[290px] gap-3 p-2 items-center"
                                    >
                                        {column.tasks.map((task, index) => (
                                            <Draggable
                                                key={task._id}
                                                isDragDisabled={
                                                    permissions.findIndex(
                                                        (perm) =>
                                                            perm.type ===
                                                                'TASK' &&
                                                            perm.action ===
                                                                'STATUS_UPDATE'
                                                    ) < 0
                                                }
                                                draggableId={task._id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div className="w-full">
                                                        <Task
                                                            provided={provided}
                                                            task={task}
                                                            permissions={
                                                                permissions
                                                            }
                                                            token={token}
                                                            getStatuses={
                                                                getStatuses
                                                            }
                                                            columns={columns}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <div
                                onClick={() => {
                                    setTaskModal(true);
                                    setSelectedColumn(column._id);
                                }}
                                className="flex p-2 mt-4 mb-2 cursor-pointer items-center justify-center opacity-90 bg-white rounded-lg shadow-sm  font-medium"
                            >
                                Add Task
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
            {isTaskModalOpen && (
                <CreateTask
                    setShowModal={setTaskModal}
                    body={{ status: selectedColumn }}
                    allStatus={columns.map((col) => ({
                        _id: col._id,
                        name: col.name,
                    }))}
                    token={token}
                    getStatuses={getStatuses}
                />
            )}
        </div>
    );
};

export default Home;
