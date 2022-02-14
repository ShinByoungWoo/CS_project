// 회원가입 페이지 컴포넌트 (ID, PW, EMAIL 정규표현식)

import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Text, Input, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

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

    // if (!emailCheck(id)) {
    //   window.alert("이메일 형식이 맞지 않습니다.");
    //   return;
    // }

    if (pwd !== userPwConfire) {
      window.alert("비밀번호가 맞지 않습니다.");
      return;
    }
    dispatch(userActions.signupNJ(id, nickname, pwd, userPwConfire));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
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
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setnickname(e.target.value);
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
        <Grid padding="16px 0px">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange={(e) => {
              setuserPwConfire(e.target.value);
            }}
          />
        </Grid>
        <Grid padding="16px 0px">
          <Button _onClick={signup} text="회원가입 하기"></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default SignUp;
