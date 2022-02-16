// 회원가입 페이지 컴포넌트 (ID, PW, EMAIL 정규표현식)

import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";
import styled from "styled-components";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [userPwConfire, setuserPwConfire] = React.useState("");
  const [nickname, setnickname] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || nickname === "") {
      window.alert("빈칸 모두 입력해주세요.");
      return;
    }
    dispatch(userActions.signupNJ(id, nickname, pwd, userPwConfire));
  };

  return (
    <React.Fragment>
      <Box>
        <Container padding="16px">
          <Text size="32px" bold>
            회원가입
          </Text>

          <Container padding="16px 0px">
            <Inputbox
              label="아이디"
              type="text"
              placeholder="아이디를 입력해주세요"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Container>

          <Container padding="16px 0px">
            <Inputbox
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요."
              onChange={(e) => {
                setnickname(e.target.value);
              }}
            />
          </Container>

          <Container padding="16px 0px">
            <Inputbox
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </Container>
          <Container padding="16px 0px">
            <Inputbox
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
              onChange={(e) => {
                setuserPwConfire(e.target.value);
              }}
            />
          </Container>
          <Button
            width="350px"
            margin="20px auto"
            _onClick={signup}
            text="회원가입 하기"
          ></Button>
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

export default SignUp;
