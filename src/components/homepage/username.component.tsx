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
import * as Yup from "yup";

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
    players,
    isLoading,
  }: {
    tournament: TournamentType | null;
    isLoading: boolean;
    players: PlayersType[] | null;
  } = useTypedSelector((state) => state.scoreboard);

  const validateScheme = Yup.object({
    username: Yup.string().required("username cant be empty."),
  });

  const formik = useFormik({
    initialValues: {
      username: username,
    },
    validationSchema: validateScheme,
    onSubmit: (
      values: { username: any },
      { setErrors }: { setErrors: any }
    ) => {
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
      if (players) {
        const isUnique = players.every(
          (player) => player.name != values.username
        );
        if (isUnique) {
          if (user) updateProfile(user, { displayName: values.username });
          if (tournament)
            dispatch(
              scoreboardAction.joinTournamentStart({ player, tournament })
            );
        } else {
          setErrors({ username: "username is alredy taken." });
        }
        onClosed();
      }
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
            {formik.errors.username && formik.touched.username && (
              <small id="username" className="form-text text-muted text-error">
                {formik.errors.username.toString()}
              </small>
            )}
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
