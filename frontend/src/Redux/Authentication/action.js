
import axios from 'axios';


export const signup = (name, email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      const response = await axios.post('https://backend-bp-1.onrender.com/users/register', {
        name,
        email,
        password
      });
      dispatch({ type: 'SIGNUP_SUCCESS' });
      console.log(response.data); 
      navigate('/login');
    } catch (error) {
      console.dir(error); // Log error in console
      dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data.error }); // Dispatch action to set error in Redux store
    }
  };
};



export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('https://backend-bp-1.onrender.com/users/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      dispatch({ type: 'LOGIN_SUCCESS' });
      console.log(response.data); 
      if(response.data.token===undefined){alert("Wrong Credentials")}else{navigate('/')};
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      console.error('Error:', error);
    }
  };
};