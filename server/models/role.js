const { Schema, model } = require('mongoose');

const RoleSchema = new Schema(
    {
        role_name: {
            type: String,
            required: true,
        },
        is_deleted: {
            type: String,
            default: false,
        },
        permissions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Permission',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = model('Role', RoleSchema);
