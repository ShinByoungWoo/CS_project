import instance from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//action

const ADD_LIKE = "ADD_LIKE"; //좋아요 기능
const LIKE_COUNT = "LIKE_COUNT";
const DELETE_LIKE = "DELETE_LIKE";

//action creator
const addLike = createAction(ADD_LIKE, (answer_id) => ({
  answer_id,
}));
const deleteLike = createAction(DELETE_LIKE, (answer_id) => ({
  answer_id,
}));
const likeCount = createAction(LIKE_COUNT, (answer_id) => ({
  answer_id,
}));

// initialState
const initialState = {
  list: {},
};

//middlewear

// // 삭제
// const deleteAnswerDB = (id) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .delete(`/api/answers/${id}`)
//       .then((res) => {
//         window.alert(res.data.msg);
//         dispatch(deleteAnswer(id));
//       })
//       .catch(() => {
//         window.alert("게시물 삭제에 실패하였습니다.");
//       });
//   };
// };

//좋아요 수 불러오기
const likeCountDB = (answer_id) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/answers/${answer_id}/likes/`)
      .then((response) => {
        dispatch(likeCount(response.data.countLikes));
        console.log(response.data.countLikes, "좋아요 수");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//좋아요 기능
export const addLikeDB = (answer_id) => {
  return function (dispatch, getState, { history }) {
    const TOKEN = localStorage.getItem("token");
    console.log(TOKEN);
    console.log(answer_id);
    instance

      .post(
        `/api/answers/${answer_id}/likes`,
        {},
        {
          headers: { authorization: `Bearer ${TOKEN}` },
        }
      )
      .then((response) => {
        dispatch(addLike(answer_id));
        console.log(response);
        // alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        window.alert("좋아요 실패!");
      });
  };
};

//좋아요 기능 취소
const deleteLikeDB = (answer_id) => {
  return function (dispatch, getState, { history }) {
    const TOKEN = localStorage.getItem("token");
    instance
      .delete(`/api/answers/${answer_id}/likes`, {
        headers: { authorization: `Bearer ${TOKEN}` },
      })
      .then((response) => {
        console.log(response);
        dispatch(deleteLike(answer_id));
      });
  };
};

//reducer
export default handleActions(
  {
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        return { likes: action.payload.answer_id+ 1 };
      }),

    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        return { likes: action.payload.answer_id - 1 };
      }),

    [LIKE_COUNT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft)
        draft.likes = action.payload.likes;
      }),
  },
  initialState
);

const actionCreators = {
  addLike,
  deleteLike,
  likeCount,
  addLikeDB,
  deleteLikeDB,
  likeCountDB,
};

export { actionCreators };
