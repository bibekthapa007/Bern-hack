import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Switch, Route } from "react-router-dom";
import { Home, Dashboard, LinkPage, Login } from "./screens";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/dashboard/">
        <Dashboard />
      </Route>
      <Route path="/link/:id">
        <LinkPage />
      </Route>
    </Switch>
  );
}

export default App;
