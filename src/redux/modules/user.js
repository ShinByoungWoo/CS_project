import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../shared/api";

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
const loginNJ = (id, pwd, nickname) => {
  console.log("111");
  return async function (dispatch, getState, { history }) {
    console.log("2221");
    const user = {
      userId: id,
      userPw: pwd,
      nickname: nickname,
    };
    await api
      .post("/api/auth", user)
      .then(function (response) {
        localStorage.setItem("nickname", response.data.nickname);
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.nickname));
        window.location.replace("/");
      })
      .catch((error) => {
        window.alert(error.response.data.errorMessage);
      });
  };
};

const signupNJ = (id, nickname, pwd, userPwConfirm) => {
  return async function (dispatch, getState, { history }) {
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
        alert(response.data.message);
      })
      .catch((error) => {
        window.alert(error.response.data.errorMessage);
      });
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
// produce는 immer 사용하기 위한 부분
export default handleActions(
  {
    [SET_USER]: (state, action) => {
      produce(state, (draft) => {
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
