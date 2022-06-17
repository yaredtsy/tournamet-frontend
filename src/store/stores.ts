import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducers } from "store/user/slice";

import { scoreboardReducer } from "store/scoreboard/slice";

import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import rootsaga from "store/root-saga";

const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [sagaMiddleware];

const isDev = process.env.NODE_ENV == "development";
console.log(isDev);
if (isDev) middleware.push(logger);

export const store = configureStore({
  reducer: {
    user: userReducers,
    scoreboard: scoreboardReducer,
  },
  devTools: isDev,
  middleware: middleware,
});

sagaMiddleware.run(rootsaga);
let currentState = store.getState();

store.subscribe(() => {
  const previosState = currentState;
  currentState = store.getState();
  if (previosState.user.user !== currentState.user.user) {
    // setAuth()
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
