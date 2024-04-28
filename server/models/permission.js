const { Schema, model } = require('mongoose');

const PermissionSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['TASK'],
            required: true,
        },
        action: {
            type: String,
            enum: ['CREATE', 'STATUS_UPDATE', 'DELETE', 'UPDATE'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Permission', PermissionSchema);
