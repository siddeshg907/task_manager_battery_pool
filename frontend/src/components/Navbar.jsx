import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Container,
  Box,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userID = localStorage.getItem("userID");

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    // Navigate back to the main page
    navigate("/");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`https://backend-bp-1.onrender.com/users`)
      .then((response) => {
        const foundUser = response.data.filter((u) => u._id === userID);
        setUser(foundUser[0].name);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userID]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        <ListItem button component={Link} to="/home/addtasks">
          <ListItemText primary="Add Task" />
        </ListItem>
        <ListItem button component={Link} to="/home/tasks">
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Completed Tasks" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit", mr: 2 }}>
              Task App
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Tab label="Add Task" component={Link} to="/home/addtasks" />
              <Tab label="Tasks" component={Link} to="/home/tasks" />
              <Tab label="Completed Tasks" component={Link} to="/home/completedtasks" />
            </Tabs>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ bgcolor: "teal", textTransform: "uppercase", mr: 1 }}>{user[0]}</Avatar>
            <Button onClick={handleLogout} variant="contained" color="secondary" sx={{ display: { xs: "none", md: "block" } }}>
              Logout
            </Button>
            <Button onClick={toggleDrawer} sx={{ display: { xs: "block", md: "none" } }}>
  <MenuIcon sx={{ color: "#fff" }} />
</Button>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {list}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;