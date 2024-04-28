import axios from 'axios';
import config from '../configs/static/index';
import { toast } from 'react-toastify';

const onDragEndFunction = async (
    result,
    token,
    getStatuses,
    columns,
    setColumns
) => {
    try {
        if (result?.source?.droppableId === result?.destination?.droppableId) {
            return;
        }

        // this is only for user experience
        let from_column_id = result?.source?.droppableId;
        let to_column_id = result?.destination?.droppableId;
        let task_id = result?.draggableId;

        if (!from_column_id || !to_column_id) {
            return;
        }

        let columnIndex = columns.findIndex((x) => x._id === from_column_id);
        let taskIndex = columns[columnIndex]?.tasks.findIndex(
            (y) => y._id === task_id
        );

        let task = columns[columnIndex]?.tasks[taskIndex];
        let board = columns;
        board[columnIndex]?.tasks.splice(taskIndex, 1);
        board.find((x) => x._id === to_column_id)?.tasks.push(task);

        setColumns(board);

        const req_config = {
            method: 'PUT',
            url: config.URL + `/tasks/${task_id}/status`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                status: result?.destination?.droppableId,
            },
        };

        try {
            await axios(req_config);
            toast.success(`Task status updated successfully`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
            getStatuses(token);
        } catch (err) {
            toast.error(`${err.response.data.message}`, {
                position: 'bottom-right',
                autoClose: 5000,
                draggable: true,
                theme: 'light',
            });
        }
    } catch (error) {
        console.log(error);
        toast.error(`${error.message}`, {
            position: 'bottom-right',
            autoClose: 5000,
            draggable: true,
            theme: 'light',
        });
    }
};

export default onDragEndFunction;
