import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../shared/api";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
// import { auth } from "../../shared/firebase";
// import firebase from "firebase/app";

//1. actions (액션 타입 만들기)
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//2. action creators(액션 생성 함수 만들기)
const logOut = createAction(LOG_OUT, (user) => ({ user })); //첫번째 인자로 액션타입을 넘겨주고 화살표함수로 우리가 쓰고 가져올 데이터를 넣어줌
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//3. initialState (기본 상태값을 임의로 지정한것)
const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "dokyung",
};

//미들웨어
const loginNJ = (id, pwd) => {
  console.log("111");
  return async function (dispatch, getState, { history }) {
    console.log("2221");
    const user = {
      userId: id,
      userPw: pwd,
    };
    await api
      .post("/api/auth", user)
      .then(function (response) {
        // localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.nickname));
        alert(response.data.message);
        // console.log(response.data.message);
        history.replace("/");
      })
      .catch((error) => {
        console.log("444");
        // console.log(err);
        window.alert(error.response.data.errorMessage);
      });
  };
};

const signupNJ = (id, nickname, pwd, userPwConfirm) => {
  return async function (dispatch, getState, { history }) {
    console.log(history);
    const userInfo = {
      userId: id,
      nickname: nickname,
      userPw: pwd,
      userPwConfirm: userPwConfirm,
    };

    await api
      .post("/api/signup", userInfo)
      .then(function (response) {
        history.push("/login");
      })
      .catch((error) => {
        window.alert(error.response.data.errorMessage);
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     dispatch(
    //       setUser({
    //         user_name: user.displayName,
    //         user_profile: "",
    //         id: user.email,
    //         uid: user.uid,
    //       })
    //     );
    //   } else {
    //     dispatch(logOut());
    //   }
    // });
  };
};

//로그아웃
const logoutNJ = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    dispatch(logOut());
    window.location.replace("/");
  };
};

//4. reducer (리덕스에 저장된 데이터를 변경하는 부분)
// produce는 immer 사용하기 위한 부분이야
export default handleActions(
  {
    [SET_USER]: (state, action) => {
      produce(state, (draft) => {
        // setCookie("is_login", "true");
        draft.user = action.payload.user;
        draft.is_login = true;
      });
    },
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// 5. action creator export
const actionCreators = {
  setUser,
  logOut,
  getUser,
  signupNJ,
  loginNJ,
  loginCheckFB,
  logoutNJ,
};

export { actionCreators };
