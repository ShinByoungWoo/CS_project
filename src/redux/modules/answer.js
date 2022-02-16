import instance from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";

//action
// const ADD_ANSWER = "ANSWER_ADD"; //혜인님이 한 것
const LOAD_ANSWER = "LOAD_ANSWER";
const ADD_ANSWER = "ADD_ANSWER";
const TOGGLE_LIKE = "UPDATE_LIKE"; //좋아요 기능
// const LOAD_ANSWER = "ANSWER_LOAD";
// const EDIT_ANSWER = "ANSWER_EDIT";
// const DELETE_ANSWER = "ANSWER_DELETE";

//action creator
// const addAnswer = createAction(ADD_ANSWER, (answer) => ({ answer })); // 혜인님이 한 것
const loadAnswer = createAction(LOAD_ANSWER, (answers) => ({ answers }));
const addAnswer = createAction(ADD_ANSWER, (answers) => ({ answers }));
const toggleLike = createAction(TOGGLE_LIKE, (answer_id, likeState) => ({
  answer_id,
  likeState,
}));

// const loadANSWER = createAction(LOAD_ANSWER, (answerList) => ({ answerList }));
// const editANSWER = createAction(EDIT_ANSWER, (ANSWERId) => ({ ANSWERId }));
// const deleteANSWER = createAction(DELETE_ANSWER, (ANSWERId) => ({ ANSWERId }));

// initialState
const initialState = {
  // answer: null,
  list: [],
};

//middlewear
 // `/api/questions/${id}/answers`,
//병우추가
// 추가하기 기능
export const addAnswerDB = (answer) => {
  return (dispatch, getState, { history }) => {
    const TOKEN = localStorage.getItem("token");
    instance
      .post("/api/questions/:questionId/answers",
        {
          answer: answer,
        },
        { headers: { authorization: `Bearer ${TOKEN}` } }
      )
      .then((response) => {
        dispatch(addAnswer(answer));
        history.goBack();
        console.log(response, "에드!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 게시글 불러오는 기능
const loadAnswerDB = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/api/questions/:questionId/answers")
      .then((response) => {
        // console.log(response);
        console.log(response.data.answers);
        dispatch(loadAnswer(response.data.answers));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};

//좋아요 기능
const toggleLikeDB = (answer_id, likeState) => {
  return function (dispatch, getState, { history }) {
    if (likeState) {
      instance
        .post(`/api/answers/:answerId/likes/`)
        .then((res) => {
          dispatch(toggleLike(answer_id, likeState));
        })
        .catch(() => {
          window.alert("좋아요 실패");
        });
    } else {
      instance
        .delete(`/api/answers/:answerId/likes/`)
        .then((res) => {
          dispatch(toggleLike(answer_id, likeState));
        })
        .catch(() => {
          window.alert("좋아요 실패");
        });
    }
  };
};

// 혜인님이 한 것
// export const addAnswerDB = (answer) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .post("/api/questions/:questionId/answers", answer)
//       .then(() => {
//         dispatch(addAnswer(answer));
//         history.push("/main");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

//reducer
export default handleActions(
  {
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.list.findIndex(
          (p) => p.postUid === action.payload.answer_id
        );
        if (action.payload.likeState) {
          draft.list[idx].postLikeCnt = draft.list[idx].postLikeCnt + 1;
          draft.list[idx].likeState = true;
        } else {
          draft.list[idx].postLikeCnt = draft.list[idx].postLikeCnt - 1;
          draft.list[idx].likeState = false;
        }
      }),

    [LOAD_ANSWER]: (state, action) => {
      return { ...state, list: action.payload.answers };
    },

    [ADD_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.answers);
      }),
  },
  initialState
);

const actionCreators = {
  toggleLikeDB,
  addAnswerDB,
  loadAnswerDB,
};

export { actionCreators };
