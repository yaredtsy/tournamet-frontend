import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  UserCredential,
} from "firebase/auth";
import { call, put, takeLatest } from "redux-saga/effects";
import { userAction } from "store/user/reducer";
import { auth } from "utils/firebase";

export function* LoginStartAync(action: { payload: string }) {
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
  yield takeLatest(userAction.loginstart, LoginStartAync);
}


export function* OtpConfirmAsync(action: {payload:{otpCode:string,firebaseConfirmation:ConfirmationResult|null}}) {
    try {
        if(action.payload.firebaseConfirmation){
            const {confirm} = action.payload.firebaseConfirmation;
            const {otpCode} = action.payload

            console.log(" OtpConfirmAsync ");
            console.log(otpCode);
            console.log(action.payload.firebaseConfirmation.verificationId);
            
            // action.payload.firebaseConfirmation.confirm(action.payload.otpCode).then((result)=>{
            //     console.log(result);
                
            // })
            
            const user:UserCredential = yield call(confirm,otpCode)
            // console.log(user);
            
        }
    } catch (error) {
        console.log(error);
        
    }
}
export function* otpConfirmStart(){
    yield takeLatest(userAction.otpConfirmStart,OtpConfirmAsync)
}
