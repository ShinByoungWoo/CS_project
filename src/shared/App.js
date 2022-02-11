import "./App.css";
import React from "react";

import Login from "../pages/Login";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";


function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;