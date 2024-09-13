// src/pages/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // 获取当前用户的任务
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/${user._id}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [user]);

    // 添加任务
    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const response = await axios.post('http://localhost:5000/api/tasks', {
                    title: newTask,
                    userId: user._id,  // 在创建任务时传递用户ID
                });
                setTasks([...tasks, response.data]);
                setNewTask('');  // 清空输入框
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    // 删除任务
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="task-list-page">
            <h2>{user.username}'s Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title} <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskList;
