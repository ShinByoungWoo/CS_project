import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import user from "./modules/user";
import post from "./modules/post";
import question from "./modules/question";
import answer from "./modules/answer";


export const history = createBrowserHistory();

// root 리듀서를 만들어줘요
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가하기
const rootReducer = combineReducers({
  user: user,
  post: post,
  answer: answer,
  question: question,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 파악
const env = process.env.NODE_ENV;

// 로거(기록 보여줌)
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//redux devtools 설정
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
