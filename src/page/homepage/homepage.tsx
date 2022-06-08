import CustomContainer from "components/Layouts/container.component";
import React, { useEffect } from "react";
import { Card, CardBody, CardImg, Col, Container, Row } from "reactstrap";
import logo from "assets/img/log2.png";
import kukulu from "assets/img/kukulu.png";
import tras from "assets/img/tras.png";
import feta from "assets/img/fetalarge.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import useTypedSelector from "hooks/useTypedSelector";
import { scoreboardAction } from "store/scoreboard/slice";

const HomePage = () => {
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
    if (!isLoading && tournament == null)
      dispatch(scoreboardAction.getTournamentStart(""));
  }, []);

  return (
    <CustomContainer>
      <div className="vh-100  d-flex align-items-center  justify-content-center align-desk home_container">
        <Row className="shadow-sm mt-mob gx-5">
          <Col lg={4} xs={12}>
            <div className="thumbnail p-5 m-5 ">
              <img src={logo} className="rounded img-fluid" alt="" />
            </div>
          </Col>
          <Col lg={8} className="mt-auto">
            <div className="d-flex align-items-center  justify-content-center">
              <div className="home_contet  w-100">
                <div className="header">
                  <span className="header-head fw-bolder">Compete</span>
                  <span className="header-foot fw-bolder"> And win prizes</span>
                </div>
              </div>
            </div>
            <Row className="my-5 gy-5 ">
              <Col sm={12} md={4}>
                <Card>
                  <CardImg src={kukulu} />
                  <CardBody>
                    <Link
                      to="/kukulu"
                      className="btn btn-primary rounded w-100"
                    >
                      {tournament
                        ? "Join to win " + tournament.price[0].gameZonePrice
                        : "Join"}
                    </Link>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card>
                  <CardImg src={tras} />
                  <CardBody>
                    <Link to="#" className="btn  rounded w-100 fredoka">
                      Coming soon..
                    </Link>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card>
                  <CardImg src={feta} />
                  <CardBody>
                    <Link to="#" className="btn  rounded w-100 fredoka">
                      Coming soon..
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </CustomContainer>
  );
};

export default HomePage;
