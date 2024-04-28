const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) => {
    const handleConfirm = async () => {
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`fixed inset-0 z-10 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-gray-800 bg-opacity-75">
                <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg text-gray-600 font-semibold mb-1">
                        {title}
                    </h2>
                    <div className="w-full border border-dotted"></div>
                    <p className="my-2 text-gray-700">{description}</p>
                    <div className="flex justify-end">
                        <button
                            className="mr-2 px-3 py-1 bg-red-600/90 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-3 py-1 bg-blue-600/90 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
