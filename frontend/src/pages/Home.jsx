import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskPage from './TaskPage';
import AddTasks from './AddTasks';
import CompletedTask from './CompletedTask';

const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/home/addtasks" />} />
      </Routes>
      <Routes>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/addtasks" element={<AddTasks />} />
        <Route path="/completedtasks" element={<CompletedTask />} />
      </Routes>
    </>
  );
};

export default Home;

