import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  updateTaskNotCompleted,
} from "../Redux/Tasks/action";
import {
  Typography,
  IconButton,
  Container,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Skeleton,
  //Button,
} from "@mui/material";
import {
  //CheckBoxOutlineBlank,
  Close,
  Delete,
  GetApp,
} from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CompletedTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchTasks(token, userID)).then(() => setLoading(false));
  }, [dispatch, token, userID]);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId, token, userID)).then(() => {
      dispatch(fetchTasks(token, userID)); // Re-fetch tasks to update the list
    });
  };

  const handleMarkAsNotCompleted = (taskId) => {
    dispatch(updateTaskNotCompleted(taskId, token, userID)).then(() => {
      dispatch(fetchTasks(token, userID)); // Re-fetch tasks to update the list
    });
  };

  const getStatusColor = (priority) => {
    switch (priority) {
      case "high":
        return "#f44336";
      case "medium":
        return "#ff9800";
      case "low":
        return "#4caf50";
      default:
        return "#000";
    }
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Title",
      "Description",
      "Due Date",
      "Priority",
      "Image URL",
    ];
    const tableRows = [];
  
    tasks.forEach((task) => {
      const taskData = [
        task.title,
        task.description, // Full description for PDF
        task.dueDate,
        task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
        task.imageURL || "No Image",
      ];
      tableRows.push(taskData);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: {
        cellPadding: 3,
        fontSize: 10,
      },
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      columnStyles: {
        0: { cellWidth: 30 }, // Title
        1: { cellWidth: 60 }, // Description
        2: { cellWidth: 30 }, // Due Date
        3: { cellWidth: 20 }, // Priority
        4: { cellWidth: 30 }, // Image URL
      },
    });
    
    doc.text("Task List", 14, 15);
    doc.save("task_list.pdf");
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box my={4}>
        <Typography
  variant="h4"
  color="primary" // Change the color to primary
  align="center"
  gutterBottom
  style={{
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif", // Change the font family
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Add a text shadow
    letterSpacing: "2px", // Increase letter spacing
    marginTop: "20px", // Add some top margin
    borderBottom: "2px solid #00bcd4", // Add a bottom border
    paddingBottom: "10px", // Add some padding to the bottom
  }}
>
  Completed Tasks
</Typography>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton color="primary" onClick={generatePDF}>
              <GetApp />
            </IconButton>
          </Box>
          <hr style={{ margin: "16px 0", border: "1px solid #ddd" }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#0d87fa'}}>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>Title</TableCell>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>Due Date</TableCell>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>Priority</TableCell>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>Delete</TableCell>
                  <TableCell style={{ fontWeight: "bold",color: 'white' }}>
                    Mark not completed
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? Array.from(new Array(5)).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width="90%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width="70%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="circular" width={24} height={24} />
                        </TableCell>
                        <TableCell>
                          <Skeleton
                            variant="rectangular"
                            width={40}
                            height={40}
                          />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                      </TableRow>
                    ))
                  : tasks &&
                    tasks
                      .filter((task) => task.status === "completed")
                      .map((task) => (
                        <TableRow key={task._id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>
                            {truncateText(task.description, 50)}
                          </TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box
                                sx={{
                                  backgroundColor: getStatusColor(
                                    task.priority
                                  ),
                                  borderRadius: "50%",
                                  width: 12,
                                  height: 12,
                                  mr: 1,
                                }}
                              />
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Avatar
                              style={{
                                backgroundColor: getStatusColor(task.priority),
                                cursor: "pointer",
                              }}
                              onClick={() => openImageInNewTab(task.imageURL)}
                            >
                              {task.imageURL ? (
                                <img
                                  src={task.imageURL}
                                  alt="task"
                                  style={{ width: "100%" }}
                                />
                              ) : (
                                "No Image"
                              )}
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteTask(task._id)}
                            >
                              <Delete style={{ color: "red" }} />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleMarkAsNotCompleted(task._id)} // Call handleMarkAsNotCompleted with task ID
                            >
                              <Close />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default CompletedTask;
