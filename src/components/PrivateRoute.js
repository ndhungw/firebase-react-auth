import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return <Route>{currentUser ? children : <Redirect to="/login" />}</Route>;
}
