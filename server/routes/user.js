// server/routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 引入用户模型

// 获取所有用户 (GET /api/users)
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // 从数据库中获取所有用户
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 获取单个用户 (GET /api/users/:id)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // 根据ID获取用户
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
});

// 登录路由
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 查找用户
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 登录成功，返回用户数据
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 创建新用户 (POST /api/users)
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 创建新用户
        const newUser = new User({
            username,
            email,
            password // 在实际应用中，密码应加密
        });
        await newUser.save(); // 保存用户到数据库
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// 删除用户 (DELETE /api/users/:id)
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id); // 根据ID删除用户
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
