import React, { useEffect, useState } from "react";

import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { NavBar, TournamentInfo } from "components/common";
import KukuluTournamentTable from "components/table/KukuluTournamentTable";
import useTypedSelector from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { scoreboardAction } from "store/scoreboard/slice";
import Userdata from "components/homepage/userdata.component";
import CustomContainer from "components/Layouts/container.component";

import Loading from "components/common/loading";

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

  if (isLoading) return <Loading />;
  else
    return (
      <CustomContainer className="kukulu-background">
        <div className="container-fluid filter">
          <Container className="vh-100">
            <Row className="align-items-center mb-4 d-flex ">
              <Col className="col-md-12 col-sm-10 mx-auto col-10 mt-lg ">
                <TournamentInfo tournament={tournament} />
              </Col>
            </Row>

            {tournament && players && (
              <KukuluTournamentTable columns={columns} data={players} />
            )}
          </Container>
        </div>
      </CustomContainer>
    );
}

export default DashBoardPage;
