import { configureStore } from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension'
import { userReducers } from "store/user/slice";
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
let currentState = store.getState()

store.subscribe(()=>{
  
  const previosState = currentState;
  currentState = store.getState();

  if(previosState.user.user !== currentState.user.user){
    // setAuth()
  }

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
