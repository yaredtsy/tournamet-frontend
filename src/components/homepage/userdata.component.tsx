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
      <div className="d-flex flex-row justify-content-between">
        <div className="p-2 ">
          {" "}
          <span className="h6 fw-bolder text-uppercase text-white">
            username :{" "}
          </span>
          <span className="fs-6 green">{player?.name}</span>
        </div>
        <div className="p-2">
          <span className="h6 fw-bolder text-uppercase text-white">
            rank :{" "}
          </span>
          <span className="green">{player?.rank}</span>
        </div>
        <div className="p-2">
          <span className="h6 fw-bolder text-uppercase text-white">
            score :{" "}
          </span>
          <span className="fs-6 green">{player?.score}</span>
        </div>
      </div>
    );
  else {
    return (
      <div className="mt-4">
        <JoinModal
          onClosed={() => {
            setModalShow(false);
          }}
          show={modalShow}
          username={user?.displayName == null ? "" : user?.displayName}
        />
        <div className="d-flex flex-row  justify-content-evenly align-items-center text-white fs-4 ">
          <span className="hobo fs-sm">You haven't joined the tournament.</span>
          <Button
            color="primary"
            className="join-button "
            size="lg"
            onClick={(e) => {
              e.preventDefault();
              setModalShow(true);
            }}
          >
            <span className="m-4 fs-4">Join </span>
          </Button>
        </div>
      </div>
    );
  }
};

export default Userdata;
