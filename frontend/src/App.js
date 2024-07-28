import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/header/Header';
import Login from './pages/Auth/login/Login';
import Signup from './pages/Auth/signup/Signup';
import Scheduler from './pages/scheduler/Scheduler'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <>
      <Header></Header>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/scheduler" element={<Scheduler />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </>
  );
}

export default App;
