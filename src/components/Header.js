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
        <Container>
          <Grid is_flex padding="16px 0px 16px 0px">
            <Grid>
              <Text margin="0px" size="24px" bold>
                지금우리면접은🖊
              </Text>
            </Grid>

            <Grid is_flex padding="16px 0px 16px 0px">
              {/* <Text>{local_nickname}</Text> */}
              <Button
                text="로그아웃"
                _onClick={() => {
                  dispatch(userActions.logoutNJ());
                }}
              ></Button>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <Grid is_flex padding="16px 0px 16px 0px">
          <Grid>
            <Text margin="0px 0px 0px 15px" size="24px" bold>
              지금우리면접은🖊
            </Text>
          </Grid>

          <Grid is_flex>
            <Button
              witdh="50%"
              text="로그인"
              _onClick={() => {
                history.push("/login");
              }}
            ></Button>
            <Button
              text="회원가입"
              _onClick={() => {
                history.push("/signup");
              }}
            ></Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const Container = styled.div`
  display: flex;
  background-color: #52b788;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  padding: 20px;
  text-align: center;
  font-size: 20px;

  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

export default Header;
