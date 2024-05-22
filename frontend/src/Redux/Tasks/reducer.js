const initialState = {
  tasks: [],
  loading: false,
  error: '',
};

export const taskReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
    case 'ADD_TASK_REQUEST':
      newState = {
        ...state,
        loading: true,
        error: '',
      };
      break;
    case 'FETCH_TASKS_SUCCESS':
      newState = {
        ...state,
        tasks: action.payload,
        loading: false,
        error: '',
      };
      break;
    case 'FETCH_TASKS_FAILURE':
    case 'ADD_TASK_FAILURE':
      newState = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    case 'ADD_TASK_SUCCESS':
      newState = {
        ...state,
        loading: false,
        error: '',
        tasks: [...state.tasks, action.payload],
      };
      break;
    case 'UPDATE_TASK_SUCCESS':
      newState = {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
      break;
    case 'DELETE_TASK_SUCCESS':
      newState = {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
      };
      break;
    default:
      return state;
  }
  return newState;
};