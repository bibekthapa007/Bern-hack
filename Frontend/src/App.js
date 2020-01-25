import React from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import {
  Home,
  Dashboard,
  LinkPage,
  Login,
  LogOut,
  History,
  Articles
} from "./screens";
import ProtectedRoute from "./components/protectedroute";
function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      <Route exact path="/" component={Home} />
      <Route path="/logout" component={LogOut} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/history" component={History} />
      <ProtectedRoute path="/articles" component={Articles} />

      <ProtectedRoute path="/link/:id" component={LinkPage} />
    </Switch>
  );
}

export default App;
