// src/App.js
import React, { useState } from 'react';
import Login from './pages/Login';
import TaskList from './pages/TaskList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData.user);  // 保存用户信息
    setIsLoggedIn(true);     // 设置为已登录状态
  };

  const handleLogout = () => {
    setUser(null);           // 清空用户信息
    setIsLoggedIn(false);    // 设置为未登录状态
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>  {/* 登出按钮 */}
          <TaskList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
