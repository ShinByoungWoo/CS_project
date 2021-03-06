import instance from '../../shared/api';
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import moment from 'moment';

//action
const ADD_QUESTION = 'QUESTION_ADD';
const LOAD_QUESTION = 'QUESTION_LOAD';

//action creator
const addQuestion = createAction(ADD_QUESTION, ({ questions, category }) => ({
  questions,
  category,
}));
const loadQuestions = createAction(LOAD_QUESTION, (questions) => ({
  questions,
}));

// initialState
const initialState = {
  list: [],
};
const initalQuestion = {
  questionTitle: '',
  questionDate: moment().format('YYYY-MM-DD'),
  questionId: '',
  nickname: '',
};

// 질문카드 서버로 보내는 작업
export const addQuestionDB = (qTitle, qCate) => {
  return (dispatch, getState, { history }) => {
    const TOKEN = localStorage.getItem('token');
    instance
      .post(
        '/api/questions',
        {
          questionTitle: qTitle,
          category: qCate,
        },
        { headers: { authorization: `Bearer ${TOKEN}` } }
      )
      .then((res) => {
        dispatch(addQuestion());
        console.log(res);
        history.push('/');
      })
      .catch((err) => {
        console.log(err, '질문생성오류');
      });
  };
};

//면접 질문 리스트 전체 불러오기
export const loadQuestionDB = () => {
  return (dispatch, getState, { history }) => {
    instance
      .get('/api/questions')
      .then((response) => {
        dispatch(loadQuestions(response.data.questions));
      })
      .catch((err) => {
        console.log(err, '질문 불러오기 오류');
      });
  };
};

//reducer
export default handleActions(
  {
    [ADD_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.questions);
      }),
    [LOAD_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        return { ...state, list: action.payload.questions };
      }),
  },
  initialState
);

const actionCreators = {
  addQuestion,
  addQuestionDB,
  loadQuestions,
  loadQuestionDB,
};

export { actionCreators };
