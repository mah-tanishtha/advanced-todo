import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { TextField, Button, MenuItem, Card, CardContent, Typography } from "@mui/material";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!taskName.trim()) {
      setError("Task name cannot be empty.");
      return;
    }
    if (taskName.length < 3 || taskName.length > 100) {
      setError("Task name must be between 3 and 100 characters.");
      return;
    }

    // Dispatch Task with a Proper Name
    dispatch(addTask({ id: Date.now(), name: taskName, priority }));

    setTaskName(""); // Clear input after adding
    setError(""); // Reset error
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Add New Task
        </Typography>

        <TextField
          label="Enter Task"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Priority Dropdown */}
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" onClick={handleAddTask} fullWidth>
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskInput;
