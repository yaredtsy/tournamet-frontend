import {all,call} from 'redux-saga/effects';
import {
    LoginStart,
    LogoutStart
} from 'store/user/user.saga'

export default function* rootSaga(){
    yield all([
        call(LoginStart),
        call(LogoutStart)
    ])
}