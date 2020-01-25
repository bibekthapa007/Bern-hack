import React, { useEffect } from "react";
import auth from "../services/authService";
import { useHistory } from "react-router-dom";
export default function LogOut() {
  const history = useHistory();
  useEffect(() => {
    auth.logout();
    history.push("/");
  });
  return <div></div>;
}
