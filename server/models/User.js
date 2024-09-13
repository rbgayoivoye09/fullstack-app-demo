// server/models/User.js
const mongoose = require('mongoose');

// 定义用户模式
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// 创建用户模型
const User = mongoose.model('User', userSchema);

module.exports = User;
