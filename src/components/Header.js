// 로그인 회원가입하기 / 내정보 알림 로그아웃 헤더 컴포넌트

import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import { apiKey } from "../shared/firebase";
import { actionCreators as userActions } from "../redux/modules/user";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  //   //firebase 세션키 가져오는 부분이라 주석처리
  //   const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  //   const is_session = sessionStorage.getItem(_session_key) ? true : false;

  // console.log(is_session);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              지금우리면접은🖊
            </Text>
          </Grid>

          <Grid is_flex>
            <Button text="내 정보"></Button>
            <Button
              _onClick={() => {
                history.push("/noti");
              }}
              text="알림"
            ></Button>
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
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
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
