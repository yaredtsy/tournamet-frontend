import { TournamentInfo } from "components/common";
import useTypedSelector from "hooks/useTypedSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { scoreboardAction } from "store/scoreboard/slice";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    tournament,
    players,
    isLoading,
  }: {
    tournament: TournamentType | null;
    players: PlayersType[] | null;
    isLoading: boolean;
  } = useTypedSelector((state) => state.scoreboard);

  useEffect(() => {
    dispatch(scoreboardAction.getTournamentStart(""));
  }, []);

  useEffect(() => {
    if (tournament) {
      dispatch(scoreboardAction.getPlayersStart(tournament));
    }
  }, [tournament]);
  if (isLoading) {
    return <>loading</>;
  } else
    return (
      <>
        <div>
          <Container>
            <Row className="align-items-center vh-100">
              <Col className="col-6 mx-auto my-auto">
                <Card>
                  <CardTitle className="m-3">
                    <CardText>
                      <span className="align-items-center">
                        Tournament{" "}
                        {!tournament && (
                          <span className="h5 p-3">No Active Tournament</span>
                        )}
                      </span>
                    </CardText>
                  </CardTitle>
                  <CardBody>
                    <TournamentInfo players={players} tournament={tournament} />
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="w-100"
                      color="primary"
                      onClick={() => {
                        navigate("/login", { replace: true });
                      }}
                    >
                      join tournament
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}

export default HomePage;
