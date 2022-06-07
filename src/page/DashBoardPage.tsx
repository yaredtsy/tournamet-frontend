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
    if (!isLoading && !tournament) {
      console.log(tournament);

      dispatch(scoreboardAction.getTournamentStart(""));
    }
  }, [isLoading, tournament]);

  useEffect(() => {
    if (tournament) {
      dispatch(scoreboardAction.getPlayersStart(tournament));
    }
  }, [tournament, dispatch]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Rank",
        accessor: "rank" as const,
      },
      {
        Header: "Name",
        accessor: "name" as const,
        disableSortBy: true,
      },
      {
        Header: "Score",

        accessor: "score" as const,
        disableSortBy: true,
      },
      {
        Header: "Reward",
        accessor: "reward" as const,
        disableSortBy: true,
      },
    ],
    []
  );

  if (isLoading) return <Loading />;
  else
    return (
      <CustomContainer className="kukulu-background ">
        <div className="container-fluid filter mb-5">
          <Container className="mb-5">
            <Row className="align-items-center mb-4 d-flex ">
              <Col className="col-md-12 col-sm-10 mx-auto col-10 mt-lg ">
                <TournamentInfo tournament={tournament} />
              </Col>
            </Row>

            {tournament && players && (
              <KukuluTournamentTable columns={columns} data={players} />
            )}
          </Container>

          <div className="mt-5 v-50">_</div>
          {/* >
          <div className="mt5 vh-25">df</div>
          <div className="mt5 vh-25">df</div>
          <div className="mt5 vh-25">df</div>
          <div className="mt5 vh-100">fd</div>

          <div className="mt5 vh-100">df</div> */}
        </div>
      </CustomContainer>
    );
}

export default DashBoardPage;
