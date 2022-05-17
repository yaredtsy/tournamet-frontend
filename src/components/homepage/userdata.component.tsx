import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { RootState } from "store/stores";

const Userdata = () => {
  const user = useSelector((state: RootState) =>
    state.scoreboard.players?.find(
      (player) => player.id === state.user.user?.uid
    )
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Card className="shadow-sm rounded border-0">
      <CardBody className="d-flex flex-row justify-content-between">
        <div className="p-2">
          {" "}
          <span className="h6 fw-bolder text-uppercase">username : </span>
          <span className="text-muted fs-6">{user?.name}</span>
        </div>
        <div className="p-2">
          <span className="h6 fw-bolder text-uppercase">rank : </span>
          <span className="text-muted">{user?.rank}</span>
        </div>
        <div className="p-2">
          <span className="h6 fw-bolder text-uppercase">score : </span>
          <span className="text-muted fs-6">{user?.score}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default Userdata;
