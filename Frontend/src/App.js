import React from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import { Home, Dashboard, LinkPage, Login } from "./screens";
import ProtectedRoute from "./components/protectedroute";
function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      <Route exact path="/" component={Home} />

      <ProtectedRoute path="/dashboard" component={Dashboard} />

      <ProtectedRoute path="/link/:id" component={LinkPage} />
    </Switch>
  );
}

export default App;
