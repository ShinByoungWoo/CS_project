import "./App.css";
import React from "react";
import styled from "styled-components";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";

import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

function App() {
  return (
    <Grid width="50%" margin="auto">
      <React.Fragment>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
        </ConnectedRouter>
      </React.Fragment>
    </Grid>
  );
}

export default App;
