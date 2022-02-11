import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import user from "./modules/user";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: user,

  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({history:history})];

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
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));


// 스토어만들기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();


