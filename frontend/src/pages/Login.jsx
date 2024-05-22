import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Authentication/action";
import { TextField, Button, Typography, Container, Box, CircularProgress } from "@mui/material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loginReducer.loading);
  const error = useSelector(state => state.loginReducer.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <Container maxWidth="sm">
      <Box my={7}>
        <Typography variant="h4" align="center" gutterBottom color="#03a9f4" fontWeight="bold">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>
        </form>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography>Don't have an account?</Typography>
          <Link to="/sign-up">
            <Typography color="primary" ml={1}>Sign up</Typography>
          </Link>
        </Box>
        {error && (
          <Box mt={3}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};


