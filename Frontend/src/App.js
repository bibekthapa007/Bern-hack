import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/loginform";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/dashboard/">
        <Dashboard />
      </Route>
      <Route path="/link/:linkid">
        <Dashboard />
      </Route>
    </Switch>
  );
}

function Home() {
  return <div>Home</div>;
}

function Dashboard() {
  return <div>Dashboard</div>;
}

export default App;
