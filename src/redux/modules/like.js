import instance from '../../shared/api';
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

//action
const ADD_LIKE = 'ADD_LIKE';
const LIKE_COUNT = 'LIKE_COUNT';
const DELETE_LIKE = 'DELETE_LIKE';

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
//좋아요 수 불러오기
const likeCountDB = (answer_id) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/answers/${answer_id}/likes/`)
      .then((response) => {
        dispatch(likeCount({ countLikes: response.data.countLikes }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//좋아요 기능
export const addLikeDB = (answer_id) => {
  return function (dispatch, getState, { history }) {
    const TOKEN = localStorage.getItem('token');
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
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      });
  };
};

//좋아요 기능 취소
const deleteLikeDB = (answer_id) => {
  return function (dispatch, getState, { history }) {
    const TOKEN = localStorage.getItem('token');
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
        return { likes: action.payload.answer_id };
      }),

    [DELETE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.likes = draft.likes.filter(
          (e) => e._id !== action.payload.answer_id
        );
      }),

    [LIKE_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.likes.push(action.payload.answer_id);
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
