import instance from '../../shared/api';
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

//action
const LOAD_ANSWER = 'LOAD_ANSWER';
const ADD_ANSWER = 'ADD_ANSWER';
const EDIT_ANSWER = 'ANSWER_EDIT';
const DELETE_ANSWER = 'ANSWER_DELETE';

//action creator
const loadAnswer = createAction(LOAD_ANSWER, (answers) => ({ answers }));
const addAnswer = createAction(ADD_ANSWER, (answers) => ({ answers }));
const editAnswer = createAction(EDIT_ANSWER, (answerId, answer) => ({
  answerId,
  answer,
}));
const deleteAnswer = createAction(DELETE_ANSWER, (answerId) => ({ answerId }));

// initialState
const initialState = {
  list: [],
};

//middlewear
// 추가하기 기능
export const addAnswerDB = (id, answer) => {
  return (dispatch, getState, { history }) => {
    const TOKEN = localStorage.getItem('token');
    instance
      .post(
        `/api/questions/${id}/answers`,
        {
          answer: answer,
        },
        { headers: { authorization: `Bearer ${TOKEN}` } }
      )
      .then((response) => {
        dispatch(addAnswer(id, answer));
        history.goBack();
        console.log(response, '에드!');
      })
      .catch((error) => {
        console.log(error, '답변생성 오류');
        window.alert(error.response.data.errorMessage);
      });
  };
};

// 게시글 불러오는 기능
const loadAnswerDB = (id) => {
  return (dispatch, getState, { history }) => {
    instance
      .get(`/api/questions/${id}/answers`)
      .then((response) => {
        dispatch(loadAnswer(response.data.answers));
        console.log(response.data.answers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//답변수정
export const editAnswerDB = (answerId, answer) => {
  return (dispatch, getState, { history }) => {
    console.log(answer);
    const TOKEN = localStorage.getItem('token');
    instance
      .patch(
        `/api/answers/${answerId}`,
        {
          answer: answer,
        },
        { headers: { authorization: `Bearer ${TOKEN}` } }
      )
      .then((response) => {
        console.log(response);
        dispatch(editAnswer(answerId, answer));
      })
      .catch((error) => {
        console.log(error, '답변 수정 오류');
        window.alert(error.response.data.errorMessage);
      });
  };
};
//답변삭제
export const deleteAnswerDB = (answerId = null) => {
  return (dispatch, getState, { history }) => {
    const TOKEN = localStorage.getItem('token');
    instance
      .delete(`/api/answers/${answerId}`, {
        headers: { authorization: `Bearer ${TOKEN}` },
      })
      .then((response) => {
        console.log(response);
        console.log(answerId);
        window.alert(response.data.message);
        dispatch(deleteAnswer(answerId));
      })
      .catch((error) => {
        console.log(error, '답변 삭제 오류');
        window.alert(error.response.data.errorMessage);
      });
  };
};

//reducer
export default handleActions(
  {
    [LOAD_ANSWER]: (state, action) => {
      return { ...state, list: action.payload.answers };
    },
    [ADD_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.answers);
      }),
    [EDIT_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (p) => p._id === action.payload.answerId
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.answer };
      }),
    [DELETE_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.answerId);
        draft.list = draft.list.filter(
          (e) => e._id !== action.payload.answerId
        );
      }),
  },
  initialState
);

const actionCreators = {
  loadAnswer,
  addAnswer,
  addAnswerDB,
  loadAnswerDB,
  editAnswer,
  deleteAnswerDB,
  deleteAnswer,
  editAnswerDB,
};

export { actionCreators };
