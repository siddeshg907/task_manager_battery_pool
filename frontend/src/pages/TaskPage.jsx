import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from '../Redux/Tasks/action';
import { Typography, Button, Container, Box, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Avatar } from "@mui/material";
import { EditOutlined, CheckCircleOutlineOutlined } from "@mui/icons-material";

const TaskPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTasks(token, userID));
    setLoading(false);
  }, [dispatch, token, userID]);

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task, token, userID));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId, token, userID));
  };

  const getStatusColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#000';
    }
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" color="textPrimary" align="center" gutterBottom>
            Tasks
          </Typography>
          <hr style={{ margin: '16px 0', border: '1px solid #ddd' }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Mark as Complete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks && tasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell style={{ color: getStatusColor(task.priority) }}>{task.priority}</TableCell>
                      <TableCell>
                        <Avatar
                          style={{ backgroundColor: getStatusColor(task.priority), cursor: 'pointer' }}
                          onClick={() => openImageInNewTab(task.imageURL)}
                        >
                          {task.imageURL ? <img src={task.imageURL} alt="task" style={{ width: '100%' }} /> : 'No Image'}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdateTask(task)}
                        >
                          <EditOutlined />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color={task.status === 'completed' ? "success" : "info"}
                          onClick={() => handleUpdateTask(task)}
                        >
                          <CheckCircleOutlineOutlined />
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

export default TaskPage;
