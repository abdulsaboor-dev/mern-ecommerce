const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRegisterSchema = new Schema({
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: {type: String}
})

const UserRegister = mongoose.model("UserRegister", userRegisterSchema);

module.exports = UserRegister;