import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//1. actions (액션 타입 만들기)
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

//2. action creators(액션 생성 함수 만들기)
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//3. initialState (기본 상태값을 임의로 지정한것)
const initialPost = {
  user_info: {
    id: 0,
    nickname: "mean0",
  },
  contents: "고양이네요!",
  insert_dt: "2021-02-27 10:00:00",
};

//4. reducer (리덕스에 저장된 데이터를 변경하는 부분)
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {}),

    [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialPost
);

//5.생성한 액션 내보내기
const actionCreators = {
  setPost,
  addPost,
};

export { actionCreators };
