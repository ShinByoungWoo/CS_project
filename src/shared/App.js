import "./App.css";
import React from "react";
import styled from "styled-components";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import NotFound from "../pages/NotFound";
import InterviewList from "../pages/InterviweList";
import QuestionWrite from "../pages/QuestionWrite";
import AnswerWrite from "../pages/AnswerWrite";
import Detail from "../pages/Detail";

//
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

function App() {
  return (
    // switch 사용해서 잘못된 주소로는 연결 안되도록 구현
    <React.Fragment>
      <Grid witdh="50%" margin="auto">
        <Header></Header>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={InterviewList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/questionwrite" exact component={QuestionWrite} />
            <Route path="/answerwrite" exact component={AnswerWrite} />
            <Route path="/detail/:id" component={Detail} />
            <Route exact component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

const Plusbtn = styled.button``;

export default App;
