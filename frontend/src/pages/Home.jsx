import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskPage from './TaskPage';
import AddTasks from './AddTasks';

const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/home/addtasks" />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/addtasks" element={<AddTasks />} />
      </Routes>
    </>
  );
};

export default Home;

