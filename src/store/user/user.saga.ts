import {PhoneAuthCredential,onAuthStateChanged,signOut,RecaptchaVerifier} from 'firebase/auth';
import {call,takeLatest} from 'redux-saga/effects';
import {userAction} from 'store/user/reducer';
import from ''

export function LoginStartAync(action:{payload:any}){
    console.log(action.payload); 
    PhoneAuthCredential.      
}
export function* LoginStart(){
    yield takeLatest(userAction.loginstart,LoginStartAync)
}

console.log(userAction.loginstart.type);
