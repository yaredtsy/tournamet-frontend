import { useFormik } from "formik";
import React from "react";
import { Timestamp } from "firebase/firestore/lite";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import useTypedSelector from "hooks/useTypedSelector";
import { User } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";

import { scoreboardAction } from "store/scoreboard/slice";
interface JoinModalProps {
  show: boolean;
  onClosed: () => void;
  username: string;
}

const JoinModal: React.FC<JoinModalProps> = ({ show, onClosed, username }) => {
  const dispatch = useDispatch();
  const { user }: { user: User | null } = useTypedSelector(
    (state) => state.user
  );

  const {
    tournament,
    isLoading,
  }: {
    tournament: TournamentType | null;
    isLoading: boolean;
  } = useTypedSelector((state) => state.scoreboard);

  const formik = useFormik({
    initialValues: {
      username: username,
    },
    onSubmit: (values) => {
      const player: PlayersType = {
        createdAt: Timestamp.now(),
        id: user?.uid != null ? user.uid : "",
        name: values.username,
        phoneNumber: user?.phoneNumber != null ? user?.phoneNumber : "",
        rank:
          tournament?.totalPlayers != null ? tournament?.totalPlayers + 1 : 1,
        reward: "",
        score: 0,
        token: "",
      };

      if (user) updateProfile(user, { displayName: values.username });
      if (tournament)
        dispatch(scoreboardAction.joinTournamentStart({ player, tournament }));

      onClosed();
    },
  });

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={show}
      toggle={onClosed}
      onClosed={onClosed}
    >
      <ModalHeader>Enter username</ModalHeader>
      <ModalBody>
        <form className="form-group" onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="username">username</Label>
            <Input
              type="text"
              id="username"
              placeholder=""
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            join
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default JoinModal;
