import React, { useEffect, useState } from "react";

import { db } from "utils/firebase";
import { collection, getDocs, where, query } from "firebase/firestore/lite";

import { Col, Container, Row } from "reactstrap";
import { NavBar, TournamentInfo } from "components/common";
import KukuluTournamentTable from "components/table/KukuluTournamentTable";
import useTypedSelector from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { scoreboardAction } from "store/scoreboard/slice";

function HomePage() {
  const dispatch = useDispatch();

  const {
    tournament,
    players,
  }: { tournament: TournamentType | null; players: PlayersType[] | null } =
    useTypedSelector((state) => state.scoreboard);

  useEffect(() => {
    dispatch(scoreboardAction.getTournamentStart(""));
  }, []);

  useEffect(() => {
    if (tournament) {
      dispatch(scoreboardAction.getPlayersStart(tournament));
    }
  }, [tournament]);

  const columns = React.useMemo(
    () => [
      {
        // Second group - Details
        Header: "rank",
        // Second group columns
        accessor: "rank" as const,
      },
      {
        // first group - TV Show
        Header: "name",
        // First group columns
        accessor: "name" as const,
      },
      {
        // Second group - Details
        Header: "score",
        // Second group columns
        accessor: "score" as const,
      },
    ],
    []
  );
  if (tournament && players)
    return (
      <>
        <NavBar />
        <Container className="mt-5">
          <Row className="align-items-center ">
            <Col className="col-4 mx-auto">
              <TournamentInfo tournament={tournament} players={players} />
            </Col>
          </Row>

          <KukuluTournamentTable columns={columns} data={players} />
        </Container>
      </>
    );
  else {
    return (
      <>
        <NavBar />
        <div>
          <h1>no tournament found</h1>
        </div>
      </>
    );
  }
}

export default HomePage;
