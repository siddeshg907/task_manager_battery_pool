import axios from 'axios';

// export const fetchTasks = (token, userID) => {
//   return async (dispatch) => {
//     dispatch({ type: 'FETCH_TASKS_REQUEST' });
//     try {
//       const response = await axios.get("https://good-shoe-cow.cyclic.app/tasks", {
//         headers: {
//           Authorization: token,
//           userID: userID,
//         },
//       });
//       const tasks = response.data.filter(task => task.userID === userID);
//       dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: tasks });
//     } catch (error) {
//       dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
//       console.error("Error fetching tasks:", error);
//     }
//   };
// };

export const fetchTasks = (token, userID) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_TASKS_REQUEST' });
    try {
      const response = await axios.get("https://backend-bp-1.onrender.com/tasks", {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });

      // Filter tasks based on userID
      const filteredTasks = response.data.filter(task => task.userID === userID);

      // Sort tasks: incomplete tasks first, then completed tasks
      filteredTasks.sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') {
          return 1; // 'a' comes after 'b'
        } else if (a.status !== 'completed' && b.status === 'completed') {
          return -1; // 'a' comes before 'b'
        } else {
          return 0; // No change in order
        }
      });

      dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: filteredTasks });
    } catch (error) {
      dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
      console.error("Error fetching tasks:", error);
    }
  };
};


export const addTask = (newTask, token, userID) => {
  return async (dispatch) => {
    dispatch({ type: 'ADD_TASK_REQUEST' });
    try {
      const response = await axios.post('https://backend-bp-1.onrender.com/tasks/add', newTask, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: response.data });
      dispatch(fetchTasks(token, userID)); // Fetch updated tasks after adding new task
    } catch (error) {
      dispatch({ type: 'ADD_TASK_FAILURE', payload: error.message });
      console.error(error.message);
    }
  };
};

export const updateTask = (task, token, userID) => {
  return async (dispatch) => {
    try {
      const updatedTask = {
        ...task,
        status: task.status === 'completed' ? 'not completed' : 'completed',
      };
      await axios.patch(`https://backend-bp-1.onrender.com/tasks/update/${task._id}`, updatedTask, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: updatedTask });
      dispatch(fetchTasks(token, userID)); // Dispatch fetchTasks after the patch request
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const updateTaskdetail = (task, token, userID) => {
  return async (dispatch) => {
    try {
      const updatedTaskdetail = {
        ...task,
      };
      await axios.patch(`https://backend-bp-1.onrender.com/tasks/update/${task._id}`, updatedTaskdetail, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: updatedTaskdetail });
      dispatch(fetchTasks(token, userID)); // Dispatch fetchTasks after the patch request
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const updateTaskNotCompleted = (taskId, token, userID) => {
  return async (dispatch) => {
    try {
      const updatedTask = {
        status: 'not completed',
      };
      await axios.patch(`https://backend-bp-1.onrender.com/tasks/update/${taskId}`, updatedTask, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: taskId });
      dispatch(fetchTasks(token, userID)); // Dispatch fetchTasks after the patch request
    } catch (error) {
      console.error(error.message);
    }
  };
};


export const deleteTask = (taskId, token, userID) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://backend-bp-1.onrender.com/tasks/delete/${taskId}`, {
        headers: {
          Authorization: token,
          userID: userID,
        },
      });
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
    } catch (error) {
      console.error(error.message);
    }
  };
};