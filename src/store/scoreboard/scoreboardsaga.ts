import { call, put, takeLatest } from "redux-saga/effects";
import { scoreboardAction } from "store/scoreboard/slice";
import { db } from "utils/firebase";
import axios from "axios";
import {
  collection,
  getDocs,
  where,
  query,
  DocumentData,
  orderBy,
  CollectionReference,
  QueryConstraint,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  Timestamp,
  setDoc,
  doc,
} from "firebase/firestore/lite";

export function* getTournamentAsync() {
  try {
    console.log("getTournamentAsync");

    const collections = collection(db, "tournamentTEST");
    // const collections:CollectionReference<DocumentData> = yield call(collection,db,'tournamentPRO')
    const querys: QueryConstraint = where("state", "!=", "CLOSED");
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
        id: document.id,
        totalPlayers: document.data().totalPlayers,
      };

      yield put(scoreboardAction.getTournamentSuccess(tournamentDoc));
    } else yield put(scoreboardAction.getTournamentSuccess(null));
  } catch (err: any) {
    yield put(scoreboardAction.getTournamentFailed(err.message));
  }
}
export function* getTournamentStart() {
  yield takeLatest(scoreboardAction.getTournamentStart, getTournamentAsync);
}

export function* getPlayersAsync(action: { payload: TournamentType }) {
  try {
    const collec = collection(db, "tournamentTEST", action.payload.id, "user");

    const orderd: QueryConstraint = orderBy("score", "desc");

    const orderdQuery: Query = query(collec, orderd);

    const players: QuerySnapshot = yield call(getDocs, orderdQuery);
    console.log(players);

    let playersList: PlayersType[] = [];

    if (!players.empty) {
      players.docs.forEach((player, index) => {
        let reward: string = "0 birr";
        if (index < action.payload.price.length) {
          reward = action.payload.price[index].price;
        }

        const playerData: PlayersType = {
          name: player.data().name,
          rank: player.data().rank,
          score: player.data().score,
          reward: reward,
          id: player.id,
          createdAt: player.data().createdAt,
          phoneNumber: player.data().phoneNumber,
          token: player.data().token,
        };

        playersList.push(playerData);
      });
    }
    yield put(scoreboardAction.getPlayersSuccess(playersList));
  } catch (error: any) {
    yield put(scoreboardAction.getPlayersFailed(error.message));
  }
}

export function* getPlayersStart() {
  yield takeLatest(scoreboardAction.getPlayersStart, getPlayersAsync);
}

export function* joinTournamenAsync(action: {
  payload: { player: PlayersType; tournament: TournamentType };
}) {
  try {
    const collec = doc(
      db,
      "tournamentTEST",
      action.payload.tournament.id,
      "user",
      action.payload.player.id
    );

    setDoc(collec, {
      claimed: false,
      ...action.payload.player,
    });

    yield put(scoreboardAction.joinTournamentSuccess(action.payload.player));
    const form = {
      tournamentDbname: "tournamentTEST",
      tournamentId: action.payload.tournament.id,
    };
    yield call(
      axios.post,
      "https://us-central1-airtime-payment.cloudfunctions.net/payment/tournamentJoined",
      form
    );
  } catch (error: any) {
    if (error.message)
      yield put(scoreboardAction.joinTournamentFailed(error.message));
  }
}

export function* joinTournamentStart() {
  yield takeLatest(scoreboardAction.joinTournamentStart, joinTournamenAsync);
}
