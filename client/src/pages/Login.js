// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    console.log('Login component rendered');

    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 发送登录请求到后端
            const response = await axios.post('http://localhost:5000/api/users/login', {
                username,
                password
            });

            // 登录成功
            if (response.status === 200) {
                onLogin(response.data); // 传递用户数据到父组件
            }
        } catch (error) {
            // 处理错误
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
