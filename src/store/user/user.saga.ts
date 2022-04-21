import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";
import { call, put, takeLatest } from "redux-saga/effects";
import { userAction } from "store/user/slice";
import { auth } from "utils/firebase";

export function* LoginStartAsync(action: { payload: string }) {
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

export function* LogoutStartAsync(payload: string) {
  try {
    yield call(auth.signOut);
    yield put(userAction.logoutSuccess())
  } catch (error) {
    yield put(userAction.logoutFailed('something is wrong'))
  }
}
export function* LogoutStart() {
  yield takeLatest(userAction.logoutStart, LoginStartAsync);
}
