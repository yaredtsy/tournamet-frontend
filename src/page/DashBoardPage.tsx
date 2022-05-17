import React, { useEffect, useState } from "react";

import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { NavBar, TournamentInfo } from "components/common";
import KukuluTournamentTable from "components/table/KukuluTournamentTable";
import useTypedSelector from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { scoreboardAction } from "store/scoreboard/slice";
import Userdata from "components/homepage/userdata.component";

function DashBoardPage() {
  const dispatch = useDispatch();

  const {
    tournament,
    isLoading,
    players,
  }: {
    tournament: TournamentType | null;
    players: PlayersType[] | null;
    isLoading: boolean;
  } = useTypedSelector((state) => state.scoreboard);

  useEffect(() => {
    if (!isLoading) dispatch(scoreboardAction.getTournamentStart(""));
  }, []);

  useEffect(() => {
    if (tournament) {
      dispatch(scoreboardAction.getPlayersStart(tournament));
    }
  }, [tournament, dispatch]);

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

  if (isLoading) return <div>loading...</div>;
  else
    return (
      <>
        <NavBar />
        <Container className="mt-5">
          <Row className="align-items-center mb-4 d-flex">
            <Col className="col-md-6 col-sm-10 mx-auto col-10">
              <Card className="shadow-sm rounded border-0">
                <CardTitle className="m-3 fw-bolder fs-5">
                  Tournament Info{" "}
                  {!tournament && (
                    <span className="h5 p-3">No Active Tournament</span>
                  )}
                </CardTitle>
                <CardBody>
                  <TournamentInfo tournament={tournament} />
                </CardBody>
              </Card>
            </Col>
            <Col className="col-md-7 col-sm-10 mx-auto mt-2 col-10">
              {players && <Userdata />}
            </Col>
          </Row>

          {tournament && players && (
            <KukuluTournamentTable columns={columns} data={players} />
          )}
        </Container>
      </>
    );
}

export default DashBoardPage;
