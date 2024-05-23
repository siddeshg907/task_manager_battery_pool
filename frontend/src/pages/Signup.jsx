import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../Redux/Authentication/action";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  //Avatar,
  //IconButton,
} from "@mui/material";
//import AddIcon from "@mui/icons-material/Add";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [profile, setProfile] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.signupReducer.loading);
  const error = useSelector(state => state.signupReducer.error);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    setPasswordError("");
    dispatch(signup(name, email, password, navigate));
  };

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfile(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  //console.log(data)

  return (
    <Container maxWidth="sm">
      <Box my={7}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="#03a9f4"
          gutterBottom
        >
          Sign Up
        </Typography>
        {/* <Box display="flex" justifyContent="center" mb={3} ml={7} alignItems="center">
          <Avatar
            src={profile}
            alt="Profile Picture"
            sx={{ width: 100, height: 100 }}
          />
          <IconButton
            component="label"
            sx={{
              position: 'relative',
              left: -30,
              color: '#03a9f4',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <AddIcon sx={{ fontSize: 40 }} />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
            />
          </IconButton>
        </Box> */}
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
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
              error={!!passwordError}
              helperText={passwordError}
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
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography>Have an account?</Typography>
          <Link to="/login">
            <Typography color="primary" ml={1}>
              Sign in
            </Typography>
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

export default Signup;
