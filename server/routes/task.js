// server/routes/task.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 获取某个用户的所有任务 (GET /api/tasks)
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const tasks = await Task.find({ userId });  // 根据 userId 查找任务
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// 创建新任务 (POST /api/tasks)
router.post('/', async (req, res) => {
    const { title, userId } = req.body;  // 接收 userId

    try {
        const newTask = new Task({ title, userId });  // 保存任务时关联用户
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// 删除任务 (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
