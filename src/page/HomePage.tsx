import React, { useEffect, useState } from "react";

import { db } from "utils/firebase";
import { collection, getDocs, where, query } from "firebase/firestore/lite";

import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { NavBar, TournamentInfo } from "components/common";
import KukuluTournamentTable from "components/table/KukuluTournamentTable";
import useTypedSelector from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { scoreboardAction } from "store/scoreboard/slice";
import RankCorrector from "components/common/RankCorrector";

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
        Header: "Rank",
        // Second group columns
        accessor: "rank" as const,
      },
      {
        // first group - TV Show
        Header: "Name",
        // First group columns
        accessor: "name" as const,
      },
      {
        // Second group - Details
        Header: "Score",
        // Second group columns
        accessor: "score" as const,
      },
      {
        Header: "Reward",
        accessor: "reward" as const,
      },
    ],
    []
  );
  if (tournament && players)
    return (
      <>
        <NavBar />
        <Container className="mt-5">
          <Row className="align-items-center mb-4">
            <Col className="col-6 mx-auto">
              <Card>
                <CardTitle className="m-3">
                  Tournament Info
                </CardTitle>
                <CardBody>
                  <TournamentInfo tournament={tournament} players={players} />
                </CardBody>
              </Card>
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
