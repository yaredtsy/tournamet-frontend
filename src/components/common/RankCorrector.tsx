import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { db } from "utils/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore/lite";

function RankCorrector() {
  useEffect(() => {
    const tournaments = query(
      collection(db, "tournamentPRO"),
      where("state", "!=", "CLOSED")
    );

    getDocs(tournaments).then((result) => {
      const quer = query(
        collection(db, "tournamentPRO", result.docs[0].id, "user"),
        orderBy("score", "desc")
      );
      getDocs(quer).then((users) => {
        users.docs.forEach((user, index) => {
          if (index + 1 != user.data().rank)
            updateDoc(user.ref, {
              rank: ++index,
              score: parseInt(user.data().score),
              temp_score: user.data().score,
            });
        });
      });
    });
  }, []);
  return <></>;
}

RankCorrector.propTypes = {};

export default RankCorrector;
