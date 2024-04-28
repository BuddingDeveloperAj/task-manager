const { Schema, model } = require('mongoose');

const StatusSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        board_color: {
            type: String,
            required: true,
        },
        is_deleted: {
            type: String,
            default: false,
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model('Status', StatusSchema);
