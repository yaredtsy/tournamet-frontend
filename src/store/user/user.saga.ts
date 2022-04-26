import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
  signOut,
} from "firebase/auth";
import { call, put, takeLatest } from "redux-saga/effects";
import { userAction } from "store/user/slice";
import { auth } from "utils/firebase";

function* LoginStartAsync(action: { payload: string }) {
  try {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    const result: ConfirmationResult = yield call(
      signInWithPhoneNumber,
      auth,
      action.payload,
      recaptchaVerifier
    );

    yield put(userAction.loginsuccess(result));
  } catch (err: any) {
    yield put(userAction.logoutfailed(err.message));
    console.log(err);
  }
}
export function* LoginStart() {
  yield takeLatest(userAction.loginstart, LoginStartAsync);
}

function* LogoutStartAsync(payload: any) {
  try {
    console.log('LogoutStartAsync');
    
    console.log(auth);
    
    yield call(signOut,auth);
    yield put(userAction.logoutSuccess())
    // console.log(auth.name);
    
  } catch (error:any) {
    console.log(error);
    
    yield put(userAction.logoutFailed('something is wrong'))
  }
}
export function* LogoutStart() {
  yield takeLatest(userAction.logoutStart, LogoutStartAsync);
}
