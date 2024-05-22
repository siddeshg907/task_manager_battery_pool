import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTask } from '../Redux/Tasks/action';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Grid, Container } from "@mui/material";

const AddTasks = () => {
    const dispatch = useDispatch();
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        imageURL: '',
        priority: 'medium',
        dueDate: '',
        userID: userID || ''
    });

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = () => {
        dispatch(addTask(newTask, token, userID));
        setNewTask({
            title: '',
            description: '',
            imageURL: '',
            priority: 'medium',
            dueDate: '',
            userID: userID
        });
    };

    return (
        <Container maxWidth="md"> {/* Set max width of container */}
            <Box mt={4}> {/* Add space from top */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Task Title"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Task Description"
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Image URL"
                            name="imageURL"
                            value={newTask.imageURL}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
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
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Due Date"
                            name="dueDate"
                            type="date"
                            value={newTask.dueDate}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddTask}
                        >
                            Add Task
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AddTasks;
