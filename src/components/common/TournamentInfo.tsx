import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

interface TournamentInfoProps {
  tournament: TournamentType;
  players: PlayersType[];
}

const TournamentInfo: React.FC<TournamentInfoProps> = ({ tournament,players }) => {

  const [timeleft, setTimeLeft] = useState('');
  const [pricepool, setPricepool] = useState('650 Birr');

  useEffect(() => {
    if (tournament) {
      let time = tournament.endesAt - Date.now();
        console.log(time);
        
      let second = Math.floor(time / 1000);
      let minutes = Math.floor(second / 60);
      let hour = Math.floor(minutes / 60);
      let day = Math.floor(hour / 24);

      setTimeLeft(`${day} days ${hour%24} hours ${minutes%60} minutes ${second%60}`);

    }
  }, [tournament]);

  return (
    <div>
      <Row>
        <Col className="col-6">Satus</Col>
        <Col className="col-6">{tournament.state}</Col>

        <Col className="col-6">Time remaining</Col>
        <Col className="col-6">{timeleft}</Col>

        <Col className="col-6">Price Pool</Col>
        <Col className="col-6">{pricepool}</Col>

        <Col className="col-6">Game</Col>
        <Col className="col-6">kukulu</Col>

        <Col className="col-6">Min players needed to start</Col>
        <Col className="col-6">{tournament.minPlayers}</Col>

        <Col className="col-6">Players joined</Col>
        <Col className="col-6">{players.length}</Col>
      </Row>
    </div>
  );
};

export default TournamentInfo;
