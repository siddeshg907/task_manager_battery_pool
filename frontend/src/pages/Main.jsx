import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { Typography, Button, Container, Box, CircularProgress } from "@mui/material";
import axios from "axios";

function Main() {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const userID = localStorage.getItem("userID");
  const [loading, setLoading] = useState(true);

  const handleGetStarted = () => {
    if (isAuth) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(`https://backend-bp-1.onrender.com/users`)
      .then((response) => {
        const foundUser = response.data.find((u) => u._id === userID);
        setUser(foundUser?.name);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" color="primary" gutterBottom>
          Task Management App
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="body1" color="textSecondary" align="center" mb={4}>
            {isAuth ? `Welcome ${user} to your own Task management app` : 
              `Task management app allows you to organize your tasks systematically. 
              You can streamline your workflow and boost productivity. 
              Helps you prioritize tasks based on their importance and urgency.`}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
        >
          {isAuth ? "Let's Add tasks!!" : "Get Started"}
        </Button>
      </Box>
    </Container>
  );
}

export default Main;
