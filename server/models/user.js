const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('User', UserSchema);
