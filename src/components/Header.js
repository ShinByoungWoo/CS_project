// 로그인 회원가입하기 / 내정보 알림 로그아웃 헤더 컴포넌트

import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import { apiKey } from "../shared/firebase";
import { actionCreators as userActions } from "../redux/modules/user";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { getCookie, deleteCookie } from "../shared/Cookie";

import styled from "styled-components";

const Header = (props) => {
  // 토큰값이 있으면, 로그인/로그아웃 화면 보여주는 곳!
  const dispatch = useDispatch();
  const local_token = localStorage.getItem("token") ? true : false;
  // const local_nickname = localStorage.getItem("nickname");
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {}, [is_login]);

  // const item = useSelector((state) => state.item.edit_item.contents);
  // const is_edit = item.id ? true : false;
  console.log(local_token);
  console.log(is_login);

  //   // if (local_token) {
  //   return (
  //     <Container>
  //       <Text size="24px" bold>
  //         지금우리면접은🖊
  //       </Text>
  //       {/* <Button
  //         text="로그아웃"
  //         _onClick={() => {
  //           dispatch(userActions.logoutNJ());
  //         }}
  //       ></Button> */}
  //       <Btn
  //         onClick={() => {
  //           history.push("/QuestionWrite");
  //         }}
  //       >
  //         <BiEdit size="100px" />
  //       </Btn>
  //     </Container>
  //   );
  //   // }
  // };

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
                // dispatch(userActions.logoutNJ());
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
