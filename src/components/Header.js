// 로그인 회원가입하기 / 내정보 알림 로그아웃 헤더 컴포넌트

import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import { apiKey } from "../shared/firebase";
import { actionCreators as userActions } from "../redux/modules/user";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { getCookie, deleteCookie } from "../shared/Cookie";
import Login from "../pages/Login";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";

const Header = (props) => {
  //cookie로 로그인 헤더부분 바뀌는 부분입니다 (서버 연결 시 해당부분 필요없음)

  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  // firebase 세션키 가져오는 부분이라 주석처리
  // const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // console.log(is_session);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_flex padding="16px 0px 16px 0px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              지금우리면접은🖊
            </Text>
          </Grid>

          <Grid is_flex padding="16px 0px 16px 0px">
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logOut({}));
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="16px 0px 16px 0px">
        <Grid>
          <Text margin="0px 0px 0px 15px" size="24px" bold>
            지금우리면접은🖊
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
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
      <Icon>
        <FiEdit size="100px"></FiEdit>
      </Icon>
    </React.Fragment>
  );
};

Header.defaultProps = {};

const Icon = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  padding: 40px;
`;
export default Header;