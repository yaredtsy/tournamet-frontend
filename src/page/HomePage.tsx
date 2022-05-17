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

    isLoading,
  }: {
    tournament: TournamentType | null;

    isLoading: boolean;
  } = useTypedSelector((state) => state.scoreboard);

  useEffect(() => {
    if (!isLoading) dispatch(scoreboardAction.getTournamentStart(""));
  }, []);

  if (isLoading) {
    return <>loading</>;
  } else
    return (
      <>
        <div>
          <Container>
            <Row className="align-items-center vh-100">
              <Col className="col-md-6 col-sm-10 mx-auto my-auto">
                <Card className="shadow-sm rounded border-0">
                  <CardTitle className="m-3 fw-bolder fs-5">
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
                    <TournamentInfo tournament={tournament} />
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="w-100 shadow-sm"
                      color="primary"
                      onClick={() => {
                        navigate("/login", { replace: true });
                      }}
                    >
                      Join Tournament
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
