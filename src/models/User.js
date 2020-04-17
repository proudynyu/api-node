const mongoose = require('mongoose');
const bcrypto = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    }

});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypto.hash(this.password, 10);
    this.password = hash;

    next();
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;