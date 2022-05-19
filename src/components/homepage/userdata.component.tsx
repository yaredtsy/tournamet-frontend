import useTypedSelector from "hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardBody } from "reactstrap";
import { RootState } from "store/stores";
import JoinModal from "./username.component";
import { User } from "firebase/auth";

const Userdata = () => {
  const [modalShow, setModalShow] = useState(false);

  const player = useSelector((state: RootState) =>
    state.scoreboard.players?.find(
      (player) => player.id === state.user.user?.uid
    )
  );
  const { user }: { user: User | null } = useTypedSelector(
    (state) => state.user
  );

  if (player)
    return (
      <Card className="shadow-sm rounded border-0">
        <CardBody className="d-flex flex-row justify-content-between">
          <div className="p-2">
            {" "}
            <span className="h6 fw-bolder text-uppercase">username : </span>
            <span className="text-muted fs-6">{player?.name}</span>
          </div>
          <div className="p-2">
            <span className="h6 fw-bolder text-uppercase">rank : </span>
            <span className="text-muted">{player?.rank}</span>
          </div>
          <div className="p-2">
            <span className="h6 fw-bolder text-uppercase">score : </span>
            <span className="text-muted fs-6">{player?.score}</span>
          </div>
        </CardBody>
      </Card>
    );
  else {
    return (
      <Card>
        <JoinModal
          onClosed={() => {
            setModalShow(false);
          }}
          show={modalShow}
          username={user?.displayName == null ? "" : user?.displayName}
        />
        <CardBody className="d-flex flex-row  justify-content-evenly align-items-center">
          <span className="">you havent joined the tournament</span>
          <Button
            color="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              setModalShow(true);
            }}
          >
            <span className="m-3">Join </span>
          </Button>
        </CardBody>
      </Card>
    );
  }
};

export default Userdata;
