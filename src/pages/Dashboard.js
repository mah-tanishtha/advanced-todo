import React from "react";
import { useSelector } from "react-redux";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import Weather from "../components/Weather";
import Auth from "../components/Auth";

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <p>Please login to view your tasks.</p>;
  }

  return (
    <div className="dashboard">
      <h2>Task Manager</h2>
      <Auth />
      <Weather />
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default Dashboard;
