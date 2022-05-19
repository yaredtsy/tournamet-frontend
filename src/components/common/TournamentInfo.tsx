import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";

interface TournamentInfoProps {
  tournament: TournamentType | null;
}

const TournamentInfo: React.FC<TournamentInfoProps> = ({ tournament }) => {
  const [timeleft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("");

  const [pricepool, setPricepool] = useState("650 Birr");

  useEffect(() => {
    if (tournament) {
      let time = tournament.endesAt - Date.now();
      console.log(time);

      let second = Math.floor(time / 1000);
      let minutes = Math.floor(second / 60);
      let hour = Math.floor(minutes / 60);
      let day = Math.floor(hour / 24);

      switch (tournament.state) {
        case "OPEND":
          setTimeLeft("Waiting for players...");
          setStatus("Waiting for players...");
          break;
        case "STARTED":
          setStatus("Started");
          setTimeLeft(
            `${day} days ${hour % 24} hours ${minutes % 60} minutes ${
              second % 60
            }`
          );
          break;
        default:
          break;
      }
    }
  }, [tournament]);

  return (
    <div>
      <Row>
        <Col className="col-6 text-uppercase fw-bolder gy-2">Satus</Col>
        <Col className="col-6">{tournament ? status : "n/A"}</Col>

        <Col className="col-6 text-uppercase fw-bolder gy-2">
          Time remaining
        </Col>
        <Col className="col-6">{tournament ? timeleft : "n/A"}</Col>

        <Col className="col-6 text-uppercase fw-bolder gy-2">Price Pool</Col>
        <Col className="col-6">{tournament ? pricepool : "n/A"}</Col>

        <Col className="col-6 text-uppercase d-flex align-self-center fw-bolder gy-2">
          <span className="my-auto">Game</span>
        </Col>
        <Col className="col-6 my-3 ">
          <Button
            onClick={(e) => {
              window.location.href = "https://www.kinet.store/kukuluet/";
            }}
            className="btn-sm ms-2 shadow-sm"
            color="primary"
            size="lg"
          >
            {tournament ? "Kukulu" : "n/A"} Download Game
          </Button>
        </Col>

        <Col className="col-6 text-uppercase fw-bolder gy-2">
          Min players needed to start
        </Col>
        <Col className="col-6">
          {tournament ? tournament.minPlayers : "n/A"}
        </Col>

        <Col className="col-6 text-uppercase fw-bolder gy-2">
          Players joined
        </Col>
        <Col className="col-6">
          {tournament ? tournament.totalPlayers : "n/A"}
        </Col>
      </Row>
    </div>
  );
};

export default TournamentInfo;
