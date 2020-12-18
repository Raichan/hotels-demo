import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Hotels from "./components/Hotels.js";
import Reserve from "./components/Reserve.js";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hotels} />
        <Route path="/reserve/:id" component={Reserve} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

export default App;
