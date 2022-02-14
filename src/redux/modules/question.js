import instance from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment"
import { queryByTitle } from "@testing-library/react";

//action
const ADD_QUESTION = "QUESTION_ADD";
const LOAD_QUESTION = "QUESTION_LOAD";
// const EDIT_QUESTION = "QUESTION_EDIT";
// const DELETE_QUESTION = "QUESTION_DELETE";


//action creator
const addQuestion = createAction(ADD_QUESTION, (question) => ({ question }));
// const loadQuestions = createAction(LOAD_QUESTION, (question) => ({ question })); 
// const editQuestion = createAction(EDIT_QUESTION, (questionId) => ({ questionId }));
// const deleteQuestion = createAction(DELETE_QUESTION, (questionId) => ({ questionId }));

// initialState
const initialState = {
	list: []
};
const initalQuestion = {
    questionTitle:"",
    questionDate: moment().format('YYYY-MM-DD')
    } 

//axios
export const addQuestionDB = (qTitle,qDate) => {
	return function (dispatch, getState, { history }) {
		const TOKEN = localStorage.getItem("token");
		instance
            .post('/api/questions',{
				questionTitle: qTitle,
				questionDate: qDate,
				},
				{headers: { authorization: `Bearer ${TOKEN}` },})
			.then(() => {
				dispatch(addQuestion());
				history.push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

// export const loadQuestionDB = () => {
// 	instance.get('/api/questions',
// 	{questions: { _id, questionTitle, author, date }
// 		},
// 	{headers: { 'Authorization': '내 토큰 보내주기' },} // 누가 요청했는 지 알려줍니다. (config에서 해요!)
// ).then(() => {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// };


//reducer
export default handleActions(
    {
        [ADD_QUESTION] : (state,action) => produce(state,(draft) => {
                draft.questions = action.payload.questionList
                console.log(draft.questions)
        }),
		[LOAD_QUESTION] : (state,action) => produce(state,(draft) => {
			draft.questions = action.payload.questionList
			console.log(draft.questions)
	})
    }
,initialState)

const actionCreators = {
    addQuestion,
    addQuestionDB,
	// loadQuestion,
	// loadQuestionDB,
}

export {actionCreators}