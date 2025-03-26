import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import { Button, TextField, Box, Typography } from "@mui/material";

const Auth = () => {
  const [username, setUsername] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim() === "") return;
    dispatch(login(username));
  };

  return (
    <Box sx={{ textAlign: "center", mb: 3 }}>
      {isAuthenticated ? (
        <>
          <Typography variant="h6">Welcome {username}!</Typography>
          <Button variant="contained" color="secondary" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <TextField
            label="Enter Name"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default Auth;
