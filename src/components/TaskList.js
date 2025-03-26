import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Card, CardContent, Typography, Button, Grid, Chip } from "@mui/material";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error"; // Red color
      case "Medium":
        return "warning"; // Yellow color
      case "Low":
        return "success"; // Green color
      default:
        return "default";
    }
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: 600, mx: "auto", mt: 3 }}>
      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center" sx={{ width: "100%" }}>
          No tasks available. Add some tasks!
        </Typography>
      ) : (
        tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {task.name}
                </Typography>

                <Chip label={task.priority} color={getPriorityColor(task.priority)} sx={{ mr: 2 }} />

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(deleteTask(task.id))}
                  sx={{ float: "right" }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default TaskList;
