import { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Container,
  FormGroup,
  Label,
  Row,
  Col,
  CardText,
  Button,
  Tooltip,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import useTypedSelector from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

import { userAction } from "store/user/slice";
import { ConfirmationResult } from "firebase/auth";
import { PongSpinner } from "react-spinners-kit";

function LoginPage() {
  const dispatch = useDispatch();

  const {
    firebaseConfirmation,
    isLoading,
  }: { firebaseConfirmation: ConfirmationResult | null; isLoading: boolean } =
    useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (firebaseConfirmation) {
      navigate("/otp-confirm", { replace: true });
    }
  }, [firebaseConfirmation]);
  const [istoggle, setToggle] = useState(false);

  const validateScheme = Yup.object({
    phoneNumber: Yup.string()
      .required("Please Enter you phone number")
      .matches(/^[90-9]*$/, "The phone number must contain only numbers")
      .matches(/^9/, "the phone must start with 9")
      .min(9, "the phone number must be at least 9 characters"),
  });

  const handleSubmit = ({ phoneNumber }: { phoneNumber: string }) => {
    dispatch(userAction.loginstart("+251" + phoneNumber));
  };
  const phoneNumber: string = "";

  return (
    <div className="kukulu-background ">
      <div className="container-fluid filter">
        <Row className="align-items-center vh-100">
          <Col className="mx-auto my-auto" md="8" lg="4" sm="10">
            <Card className="shadow-sm border-rounded border-0 ">
              <CardTitle className="m-3">
                <CardText className="fw-bolder fs-3 d-flex justify-content-center">
                  Login
                </CardText>
              </CardTitle>
              <CardBody className="body-color">
                <Formik
                  initialValues={{ phoneNumber }}
                  onSubmit={handleSubmit}
                  validationSchema={validateScheme}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <FormGroup className="form-group rounded ">
                        <div className="input-group">
                          <span className="input-group-text">+251</span>
                          <Field
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            placeholder="phone Number"
                          ></Field>
                        </div>
                        {errors.phoneNumber && touched.phoneNumber && (
                          <small
                            id="phoneNumber"
                            className="form-text text-muted text-error d-block"
                          >
                            {errors.phoneNumber}.
                          </small>
                        )}
                      </FormGroup>
                      <div id="recaptcha-container" />
                      <div className=" d-flex justify-content-center">
                        {isLoading ? (
                          <PongSpinner color="#e94b3cff" size={40} />
                        ) : (
                          <Button type="submit" color="primary">
                            Login
                          </Button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default LoginPage;
