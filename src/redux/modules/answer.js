import instance from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"

//action
const ADD_ANSWER = "ANSWER_ADD";
// const LOAD_ANSWER = "ANSWER_LOAD";
// const EDIT_ANSWER = "ANSWER_EDIT";
// const DELETE_ANSWER = "ANSWER_DELETE";

//action creator
const addAnswer = createAction(ADD_ANSWER, (answer) => ({ answer }));
// const loadANSWER = createAction(LOAD_ANSWER, (answerList) => ({ answerList }));
// const editANSWER = createAction(EDIT_ANSWER, (ANSWERId) => ({ ANSWERId }));
// const deleteANSWER = createAction(DELETE_ANSWER, (ANSWERId) => ({ ANSWERId }));

// initialState
const initialState = {
    answer: null,
    answers: [],
  };

export const addAnswerDB = (answer) => {
	return function (dispatch, getState, { history }) {
		instance
            .post('/api/questions/:questionId/answers', answer)
			.then(() => {
				dispatch(addAnswer(answer));
				history.push('/main');
			})
			.catch((err) => {
				console.log(err);
			});
	};
};





//reducer
export default handleActions(
    {
        [ADD_ANSWER] : (state,action) => produce(state,(draft) => {
                draft.questions = action.payload.questionList
                console.log(draft.questions)
        })
    }
,initialState)

const actionCreators = {
    addAnswer,
}

export {actionCreators}