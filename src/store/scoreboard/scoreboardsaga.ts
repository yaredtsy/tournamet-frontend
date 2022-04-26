import { call, put, takeLatest } from "redux-saga/effects";
import { scoreboardAction } from "store/scoreboard/slice";
import { db } from "utils/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  DocumentData,
  CollectionReference,
  QueryConstraint,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore/lite";

export function* getTournamentAsync() {
  try {
    const collections = collection(db, "tournamentPRO");
    // const collections:CollectionReference<DocumentData> = yield call(collection,db,'tournamentPRO')
    const querys: QueryConstraint = where("state", "==", "OPENED");
    const tournament: Query = query(collections, querys);

    const documents: QuerySnapshot = yield call(getDocs, tournament);

    if (!documents.empty) {
      const document: QueryDocumentSnapshot<DocumentData> = documents.docs[0];
      const tournamentDoc: TournamentType = {
        state: document.data().state,
        endesAt: document.data().endesAt,
        enteringFee: document.data().enteringFee,
        minPlayers: document.data().minPlayers,
        price: document.data().price,
      };

      yield put(scoreboardAction.getTournamentSuccess(tournamentDoc));
    }
  } catch (err:any) {
    yield put(scoreboardAction.getTournamentFailed(err.message))
  }
}
export function* getTournamentStart() {
  yield takeLatest(scoreboardAction.getPlayersStart, getTournamentAsync);
}

export function* getPlayersAsync(){
  try {
    
  } catch (error:any) {
    yield put(scoreboardAction.getPlayersFailed(error.message))
  }
}
export function* getPlayersStart(){
  yield takeLatest(scoreboardAction.getPlayersStart,getPlayersAsync)
}