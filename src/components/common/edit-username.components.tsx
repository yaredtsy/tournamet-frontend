import { updateProfile, User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore/lite";
import { useFormik } from "formik";
import useTypedSelector from "hooks/useTypedSelector";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { scoreboardAction } from "store/scoreboard/slice";
import { RootState } from "store/stores";
import { userAction } from "store/user/slice";
import { db } from "utils/firebase";

interface EditUsernameModalProps {
  show: boolean;
  onClosed: () => void;
}

const EditUsernameModal: React.FC<EditUsernameModalProps> = ({
  show,
  onClosed,
}) => {
  const dispatch = useDispatch();

  const { user }: { user: User | null } = useTypedSelector(
    (state) => state.user
  );

  const player = useSelector((state: RootState) =>
    state.scoreboard.players?.find(
      (player) => player.id === state.user.user?.uid
    )
  );
  const {
    tournament,
  }: {
    tournament: TournamentType | null;
  } = useTypedSelector((state) => state.scoreboard);

  const formik = useFormik({
    initialValues: {
      username: user?.displayName,
    },
    onSubmit: (values) => {
      if (user?.displayName != values.username) {
        if (user) {
          updateProfile(user, { displayName: values.username }).then(
            (results) => {
              console.log(results);
              if (values.username)
                dispatch(
                  userAction.userUpdated({
                    ...user,
                    displayName: values.username,
                  })
                );
            }
          );
        }
        if (user && tournament) {
          const ref = doc(
            db,
            "tournamentTEST",
            tournament.id,
            "user",
            user.uid
          );
          updateDoc(ref, { name: values.username }).then((results) => {
            console.log(results);
            if (player && values.username)
              dispatch(
                scoreboardAction.updatePlayer({
                  ...player,
                  name: values.username,
                })
              );
          });
          onClosed();
        }
      }
    },
  });

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      isOpen={show}
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
              value={
                formik.values.username != null ? formik.values.username : ""
              }
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

export default EditUsernameModal;
