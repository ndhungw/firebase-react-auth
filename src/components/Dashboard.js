import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (err) {
      setError(err.message);
      console.log("err", err);
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div>Hello {currentUser.email}</div>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </>
  );
}
