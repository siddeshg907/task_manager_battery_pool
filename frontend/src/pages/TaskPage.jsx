import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTasks, updateTask } from '../Redux/Tasks/action';
import { Typography, Button, Container, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const TaskPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'not completed',
    priority: 'medium',
    userID: userID || ''
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTasks(token, userID));
    setLoading(false);
  }, [dispatch, token, userID]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    dispatch(addTask(newTask, token, userID));
    setNewTask({
      title: '',
      description: '',
      status: 'not completed',
      priority: 'medium',
      userID: userID
    });
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task, token, userID));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId, token, userID));
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
            Tasks
          </Typography>
          <hr style={{ margin: '16px 0', border: '1px solid #ddd' }} />
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => setShowForm(!showForm)}
            sx={{ mb: 2 }}
          >
            {showForm ? "Hide Form" : "Add a new task"}
          </Button>
          {showForm && (
            <Box mt={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Task Title"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Task Description"
                name="description"
                value={newTask.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  label="Priority"
                  name="priority"
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddTask}
                sx={{ mb: 2 }}
              >
                Add Task
              </Button>
            </Box>
          )}
          <TableContainer >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                tasks && tasks.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={task.status === 'completed' ? "success" : "info"}
                        onClick={() => handleUpdateTask(task)}
                        sx={{ mr: 1 }}
                      >
                        {task.status === 'completed' ? 'Mark not completed' : 'Mark completed'}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      </Container>
    </>
  );
};

const priorityColors = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50',
};

export default TaskPage;
