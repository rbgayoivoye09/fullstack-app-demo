// server/models/Task.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义任务模式
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,  // 关联到 User 模型
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 创建任务模型
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
