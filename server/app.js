// server/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// 中间件
app.use(express.json());
app.use(cors());

// 用户路由
const userRouter = require('./routes/user');
app.use('/api/users', userRouter);

// 任务路由
const taskRouter = require('./routes/task');
app.use('/api/tasks', taskRouter);

// 连接MongoDB
mongoose.connect('mongodb://10.1.69.93:27017/fullstack-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
