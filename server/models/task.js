const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assigned_to: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Task', TaskSchema);
