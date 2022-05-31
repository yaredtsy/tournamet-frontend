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
import { useDispatch } from "react-redux";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

import useTypedSelector from "hooks/useTypedSelector";

import { userAction } from "store/user/slice";
import { ConfirmationResult, UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PongSpinner } from "react-spinners-kit";

function OtpConfirmation() {
  const [otpError, setOtpError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    firebaseConfirmation,
    isLoading,
  }: { firebaseConfirmation: ConfirmationResult | null; isLoading: boolean } =
    useTypedSelector((state) => state.user);
  const [istoggle, setToggle] = useState(false);

  useEffect(() => {
    if (!firebaseConfirmation) {
      navigate("/login");
    }
  }, [firebaseConfirmation]);

  const validateScheme = Yup.object({
    otpCode: Yup.string()
      .required("Please Enter you the code")
      .matches(/^[0-9]*$/, "The otp must contain only numbers")
      .min(6, "the otp must be at least 6 characters"),
  });

  const handleSubmit = (
    { otpCode }: { otpCode: string },
    { setErrors }: { setErrors: any }
  ) => {
    firebaseConfirmation
      ?.confirm(otpCode)
      .then((user: UserCredential | null) => {
        if (user) {
          dispatch(userAction.otpConfirmSuccess(user.user));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setErrors({ otpCode: "please enter the correct otp code" });
        // set
      });

    // dispatch(userAction.otpConfirmStart({ otpCode, firebaseConfirmation }));
  };
  const otpCode: string = "";

  return (
    <div className="kukulu-background ">
      <div className="container-fluid filter">
        <Row className="align-items-center vh-100">
          <Col className="col-4 mx-auto my-auto" md="8" lg="4" sm="10">
            <Card className="shadow-sm border-rounded border-0 ">
              <CardTitle className="m-3">
                <CardText className="fw-bolder fs-3  d-flex justify-content-center">
                  Otp code
                </CardText>
              </CardTitle>
              <CardBody className="body-color">
                <Formik
                  initialValues={{ otpCode }}
                  onSubmit={(values, action) => {
                    handleSubmit(values, action);
                  }}
                  validationSchema={validateScheme}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <FormGroup className="form-group">
                        <div className="input-group">
                          <span className="input-group-text">otp code</span>
                          <Field
                            className="form-control"
                            name="otpCode"
                            placeholder="otp"
                          ></Field>
                        </div>
                        {errors.otpCode && touched.otpCode && (
                          <small
                            id="otpCode"
                            className="form-text text-muted text-error"
                          >
                            {errors.otpCode}.
                          </small>
                        )}
                      </FormGroup>
                      <div id="recaptcha-container" />
                      <div className=" d-flex justify-content-center">
                        {isLoading ? (
                          <PongSpinner color="#e94b3cff" size={40} />
                        ) : (
                          <Button type="submit" color="primary">
                            verify
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

export default OtpConfirmation;
