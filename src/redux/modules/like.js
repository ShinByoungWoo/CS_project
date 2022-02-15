import instance from "../../shared/api";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";

//action
const SET_POST = "SET_POST";
const TOGGLE_LIKE = "UPDATE_LIKE";
const ADD_POST = "ADD_POST";

//action creator
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const toggleLike = createAction(TOGGLE_LIKE, (answer_id, likeState) => ({
  answer_id,
  likeState,
}));

// initialState

const initialState = {
  list: [],
  postLikeCnt: 0,
};

const initalPost = {
  questionTitle: "",

  // post_date: moment().format("YYYY-MM-DD"),
};
const TOKEN = localStorage.getItem("token");
//middleware

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

// 추가하기 기능
const addPostDB = (answer) => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user; // getState스토어에있는 정보가져옴
    console.log(_user);

    const user_info = {
      nickname: _user.nickname,
      id: _user.userId,
    };
    const _post = {
      ...initalPost,
      answer: answer,
    };
    console.log(_post);

    const TOKEN = localStorage.getItem("token");
    console.log(TOKEN);

    instance
      .post(`/api/questions/:questionId/answers`, {
        answer: answer,
      })
      .then(function (response) {
        window.alert("답변 카드 생성 성공");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        window.alert("답변 생성 실패");
      });
  };
};

// 게시글 불러오는 기능
const getAnswerDB = () => {
  return function (dispatch, getState, { history }) {
    instance.get("/api/questions/:questionId/answers").then((response) => {
      // 데이터를 가져온다 // .then은 앞에꺼 실행한 후 다음 동작을 하는 것이다.
      console.log(response.data);

      let post_list = []; // 넘어가는 setPost는 배열이기때문에 각 데이터는 배열로 묶여야한다

      response.data.posts.forEach((_post) => {
        // forEach로  객체 하나하나 돌게 한다.
        // let fitpost = {  // post componets의 있는 데이터와 파이어스토어에 있는 데이터가 형식이 조금 달라서 맞춰야아한다.
        //     id:fitpost.id,
        //     ...fitpost.data()
        // }

        let post = {
          id: _post.questionid,
          user_name: _post.nickname,
          answer: _post.answer,
        };

        post_list.push(post);
      });

      console.log(post_list);

      dispatch(setPost(post_list));

      // })
      // console.log(initialState.list)
      // const a = [...initialState.list,{id: "yougnble@aa.com",
      // user_name: "youngble",
      // content:"test 내용",
      // img_url: 'https://newsimg.hankookilbo.com/cms/articlerelease/2021/06/05/ef519975-80c8-40b6-b25a-47ab6270dc60.png'}]
      // console.log(a);

      // dispatch(setPost(initialState.list)) //나중에 필요
    });
  };
};

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
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }), // 리스트를 초기값에서 갈아끼우기
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
        console.log(draft.list);
      }),
  },
  initialState
);

//action crate export
const actionCreators = {
  toggleLikeDB,
  addPostDB,
  getAnswerDB,
};

export { actionCreators };


// getMainAPI 
// addPostDB 