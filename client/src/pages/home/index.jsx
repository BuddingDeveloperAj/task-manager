import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import Task from '../../components/Task';

const Board = {
    backlog: {
        name: 'Backlog',
        column_color: '#D1F2EB',
        items: [
            {
                id: '1',
                title: 'Admin Panel Front-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'medium',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
            {
                id: '2',
                title: 'Admin Panel Back-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'low',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
        ],
    },
    pending: {
        name: 'Pending',
        column_color: '#F9E79F',
        items: [
            {
                id: '3',
                title: 'Admin Panel Back-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'high',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
            {
                id: '4',
                title: 'Admin Panel Front-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'low',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
            {
                id: '5',
                title: 'Admin Panel Front-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'low',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
            {
                id: '6',
                title: 'Admin Panel Front-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'low',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
            {
                id: '7',
                title: 'Admin Panel Front-end',
                description: 'Lorem ipsum dolor sit amet ..',
                priority: 'low',
                deadline: 50,
                tags: [
                    { title: 'Test', color: '#ff0000' },
                    { title: 'Front', color: '#00ff00' },
                ],
            },
        ],
    },
};

const Home = () => {
    const [columns, setColumns] = useState(Board);
    const [selectedColumn, setSelectedColumn] = useState('');

    const openModal = (columnId) => {
        setSelectedColumn(columnId);
        setModalOpen(true);
    };

    const onDragEnd = (result) => console.log(result);

    return (
        <div className="w-[100%]">
            <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
                <div className="w-full flex items-start px-5 py-3 gap-5">
                    {Object.entries(columns).map(([columnId, column]) => (
                        <div
                            className="flex flex-col rounded-lg p-2 container-with-scrollbar"
                            key={columnId}
                            style={{ backgroundColor: column.column_color }}
                        >
                            <div className="flex items-center justify-center py-2 my-2 w-full bg-white rounded-lg shadow-sm text-gray-600 font-medium">
                                {column.name}
                            </div>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="flex flex-col h-[70vh] overflow-y-auto w-[290px] gap-3 p-2 items-center"
                                    >
                                        {column.items.map((task, index) => (
                                            <Draggable
                                                key={task.id.toString()}
                                                draggableId={task.id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <>
                                                        <Task
                                                            provided={provided}
                                                            task={task}
                                                        />
                                                    </>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <div
                                onClick={() => openModal(columnId)}
                                className="flex p-2 mt-4 mb-2 cursor-pointer items-center justify-center opacity-90 bg-white rounded-lg shadow-sm  font-medium"
                            >
                                Add Task
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Home;
