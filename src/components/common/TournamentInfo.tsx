import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { CgFormatSlash } from "react-icons/cg";

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

      const sum = tournament.price.reduce((prev, current) => {
        return prev + current.value;
      }, 0);
      setPricepool(sum.toString() + " Birr");

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
    <div className="tournament-inf ">
      <Row>
        <Col className="d-flex header-parent position-relative" md={6} lg={3}>
          <div className="headers-info ">
            <div className="text-center text-capitalize">game status</div>
            <div className="text-center fs-4 fw-bolder fs-sm">
              {tournament ? status : "n/A"}
            </div>
          </div>
          {/* <span className="text-white fs-1 ms-auto d-flex align-items-start">
            <CgFormatSlash />
          </span> */}
        </Col>
        <Col className="d-flex  header-parent position-relative" md={6} lg={3}>
          <div className="headers-info">
            <div className="text-center text-capitalize">timeleft</div>
            <div className="text-center fs-4 fw-bolder fs-sm">
              {tournament ? timeleft : "n/A"}
            </div>
          </div>
        </Col>
        <Col className="d-flex  header-parent position-relative" md={6} lg={2}>
          <div className="headers-info ">
            <div className="text-center text-capitalize">Price pool</div>
            <div className="text-center fs-4 fw-bolder fs-sm">
              {tournament ? pricepool : "n/A"}
            </div>
          </div>
        </Col>
        <Col className="d-flex  header-parent position-relative" md={6} lg={2}>
          <div className="headers-info ">
            <div className="text-center text-capitalize">
              min players required
            </div>
            <div className="text-center fs-4 fw-bolder fs-sm">
              {tournament ? tournament.minPlayers : "n/A"}
            </div>
          </div>
        </Col>
        <Col className="d-flex" md={6} lg={2}>
          <div className="headers-info ">
            <div className="text-center text-capitalize">Players joined</div>
            <div className="text-center fs-4 fw-bolder fs-sm">
              {tournament ? tournament.totalPlayers : "n/A"}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TournamentInfo;
