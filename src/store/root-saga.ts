import {all,call} from 'redux-saga/effects';
import {
    LoginStart
} from 'store/user/user.saga'

export default function* rootSaga(){
    yield all([
        call(LoginStart),
    ])
}