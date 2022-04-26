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
    console.log("handleSubmit");

    console.log(setErrors);
    firebaseConfirmation
      ?.confirm(otpCode)
      .then((user: UserCredential | null) => {
        if (user) {
          console.log(user.user);
          dispatch(userAction.otpConfirmSuccess(user.user));
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error");

        setErrors({ otpCode: "please enter the correct otp code" });
        // set
      });

    // dispatch(userAction.otpConfirmStart({ otpCode, firebaseConfirmation }));
  };
  const otpCode: string = "";

  return (
    <Container>
      <Row className="align-items-center vh-100">
        <Col className="col-6 mx-auto my-auto">
          <Card>
            <CardTitle className="m-3">
              <CardText>Otp code</CardText>
            </CardTitle>
            <CardBody>
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
                      <Label>
                        <span id="otpCode">otp code</span>
                        <Tooltip
                          placement="right"
                          isOpen={istoggle}
                          target="otpCode"
                          toggle={() => setToggle(!istoggle)}
                        >
                          opt code sent by sms
                        </Tooltip>
                      </Label>
                      <Field className="form-control" name="otpCode"></Field>
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
                    {isLoading ? (
                      <p>...is loading</p>
                    ) : (
                      <Button type="submit" color="primary">
                        verify
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OtpConfirmation;
