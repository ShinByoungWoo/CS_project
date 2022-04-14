import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

import styled from "styled-components";

const Header = () => {
  const dispatch = useDispatch();
  const local_token = localStorage.getItem("token") ? true : false;
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {}, [is_login]);

  if (local_token) {
    return (
      <React.Fragment>
        <Container padding="20px 20%">
          <img
            src="/images/logo.png"
            alt=""
            width="350px"
            onClick={() => history.push("/")}
          />
          <Card>
            <Button
              margin="0px 10px"
              width="150px"
              text="내정보"
              _onClick={() => {
              }}
            ></Button>
            <Button
              width="150px"
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutNJ());
              }}
            ></Button>
          </Card>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container padding="20px 20%">
        <img
          src="/images/logo.png"
          alt=""
          width="350px"
          onClick={() => history.push("/")}
        />
        <Card>
          <Button
            margin="0px 10px"
            width="150px"
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
          ></Button>
          <Button
            width="150px"
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Card>
      </Container>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const Container = styled.div`
  display: flex;
  height: 150px;
  width: 100%;
  background-color: #52b788;
  justify-content: space-around;
`;

const Card = styled.div`
  position: relative;
  width: 350px;

  padding: 20px;
  margin-top: 30px;
  text-align: center;

  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const Imgsize = styled.div`
  width: 150px;
  height: 100px;
`;

export default Header;
