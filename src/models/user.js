// Model để lưu trữ dữ liệu
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
