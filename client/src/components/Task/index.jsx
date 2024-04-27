const Task = ({ task = {}, provided = {} }) => {
    const {
        title = '',
        description = '',
        priority = '',
        deadline = '',
        assigned_to = {},
    } = task;

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
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
            <div className="w-full flex items-center justify-between">
                <span className="text-[13px] text-gray-700">
                    {deadline} mins
                </span>
                <span className="text-[13px] text-gray-700">{'Ajay Ravi'}</span>
            </div>
        </div>
    );
};

export default Task;
