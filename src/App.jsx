import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks"
        element={isAuth ? <Tasks setIsAuth={setIsAuth} /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuth ? "/tasks" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
