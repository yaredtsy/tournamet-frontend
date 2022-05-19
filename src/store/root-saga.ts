import { all, call } from "redux-saga/effects";
import { LoginStart, LogoutStart } from "store/user/user.saga";

import {
  getPlayersStart,
  getTournamentStart,
  joinTournamentStart,
} from "store/scoreboard/scoreboardsaga";

export default function* rootSaga() {
  yield all([
    call(LoginStart),
    call(LogoutStart),
    call(getPlayersStart),
    call(getTournamentStart),
    call(joinTournamentStart),
  ]);
}
