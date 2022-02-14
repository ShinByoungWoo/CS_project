// 회원가입 컴포넌트

import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { FocusEventHandler } from "react";
// ("./modules/user");

import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { Input, Text, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";

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
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>
        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>
        <Button
          _onClick={login}
          // _disabled={id === "" || pwd === "" ? true : false}
        >
          로그인하기
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
