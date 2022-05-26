import CustomContainer from "components/Layouts/container.component";
import useTypedSelector from "hooks/useTypedSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PongSpinner } from "react-spinners-kit";
import { Button, Container } from "reactstrap";
import { scoreboardAction } from "store/scoreboard/slice";

function KukuluPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    tournament,
    isLoading,
  }: {
    tournament: TournamentType | null;

    isLoading: boolean;
  } = useTypedSelector((state) => state.scoreboard);

  useEffect(() => {
    console.log("navigate.name");
    console.log(location.pathname);

    if (!isLoading) dispatch(scoreboardAction.getTournamentStart(""));
  }, []);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        {" "}
        <PongSpinner color="#e94b3cff" size={90} />
      </div>
    );
  } else
    return (
      <CustomContainer className="kukulu-background">
        <Container className="vh-100">
          <div className="content">
            <div className="header">
              <span className="header-head fw-bolder">Compete</span>
              <span className="header-foot fw-bolder"> And in 500</span>
            </div>
            <div className="buttons align-self-center d-flex justify-content-center mt-5">
              <Button
                className="rounded fs-2"
                color="danger"
                size="lg"
                onClick={() => navigate("/login", { replace: true })}
              >
                <span className="mx-3">Join Now</span>
              </Button>
              <Button
                className="rounded fs-2 ms-2"
                color="primary"
                size="lg"
                onClick={(e) => {
                  window.location.href = "https://www.kinet.store/kukuluet/";
                }}
              >
                <span className="mx-3">Download Game</span>
              </Button>
            </div>
          </div>
        </Container>
      </CustomContainer>
    );
}

export default KukuluPage;
