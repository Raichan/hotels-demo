import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Hotels from "./components/Hotels.js";
import Reserve from "./components/Reserve.js";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  page: {
    maxWidth: 650,
    margin: "0 auto",
    padding: 10,
    minHeight: "100vh",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.page}>
      <Router>
        <Switch>
          <Route exact path="/" component={Hotels} />
          <Route path="/reserve/:id" component={Reserve} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </Paper>
  );
};

export default App;
