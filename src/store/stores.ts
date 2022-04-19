import { configureStore } from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension'
import { userReducers } from "store/user/reducer";
import createSagaMiddleware from "@redux-saga/core";
import loger from 'redux-logger';

import rootsaga from 'store/root-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware,loger]

export const store = configureStore({
  reducer: {
    user: userReducers,
  },
  devTools: true,
  middleware: middleware

});

sagaMiddleware.run(rootsaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
