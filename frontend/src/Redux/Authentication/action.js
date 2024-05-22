
import axios from 'axios';

export const signup = (name, email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: 'SIGNUP_REQUEST' });
    try {
      const response = await axios.post('http://localhost:8080/users/register', {
        name,
        email,
        password
      });
      dispatch({ type: 'SIGNUP_SUCCESS' });
      console.log(response.data); 
      navigate('/login');
    } catch (error) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data.error });
      console.error(error.response.data.error);
    }
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
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