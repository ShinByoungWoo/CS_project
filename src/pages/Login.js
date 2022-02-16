// 회원가입 컴포넌트

import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { FocusEventHandler } from "react";
// ("./modules/user");

import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { Input, Text, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";

const Login = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const login = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호를 입력해주세요");
      return;
    }
    dispatch(userActions.loginNJ(id, pwd));
  };

  return (
    <React.Fragment>
      <Box>
        <Container>
          <Text size="20px" bold>
            로그인
          </Text>
          <Container>
            <Inputbox
              label="아이디"
              placeholder="아이디를 입력해주세요"
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Container>
          <Container>
            <Inputbox
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </Container>
          <Button
            width="350px"
            margin="20px auto"
            _onClick={() => {
              login();
            }}
          >
            로그인하기
          </Button>
        </Container>
      </Box>
    </React.Fragment>
  );
};

const Box = styled.div`
  margin-top: 150px;
  display: grid;
  padding: auto;

  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  text-align: center;
  background-color: white;
  border-radius: 10px;
`;

const Inputbox = styled.input`
  background-color: white;
  width: 450px;
  height: 30px;
  border-radius: 4px;
  margin: 10px;
`;

export default Login;
