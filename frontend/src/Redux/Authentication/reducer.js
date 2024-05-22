const initialState = {
  loading: false,
  error: '',
};

export const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        loading: true,
        error: null // Reset error state on request
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null // Reset error state on success
      };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload // Set error state on failure
      };
    default:
      return state;
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: '',
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        error: '',
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
