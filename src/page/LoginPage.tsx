import { useState } from "react";
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

import {useDispatch} from  'react-redux'
import { Field, Formik,Form } from "formik";
import * as Yup from "yup";

import {userAction} from 'store/user/reducer';

function LoginPage() {
  const dispatch = useDispatch();

  const [istoggle, setToggle] = useState(false);
  
  const validateScheme = Yup.object({
    phoneNumber: Yup.string()
      .required("Please Enter you phone number")
      .matches(/^[0-9]*$/, "The phone number must contain only numbers")
      .min(9, "the phone number must be at least 9 characters"),
  });

  const handleSubmit = ({phoneNumber}:{phoneNumber: string}) => {
    console.log("handleSubmit");
    
    console.log(phoneNumber);
    dispatch(userAction.loginstart(phoneNumber))
    
  };
  const phoneNumber: string = "";

  return (
    <Container>
      <Row className="align-items-center vh-100">
        <Col className="col-6 mx-auto my-auto">
          <Card>
            <CardTitle className="m-3">
              <CardText>Login</CardText>
            </CardTitle>
            <CardBody>
              <Formik
                initialValues={{ phoneNumber }}
                onSubmit={handleSubmit}
                validationSchema={validateScheme}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormGroup className="form-group">
                      <Label>
                        <span id="phoneNumber">Phone number</span>
                        <Tooltip
                          placement="right"
                          isOpen={istoggle}
                          target="phoneNumber"
                          toggle={() => setToggle(!istoggle)}
                        >
                          kukulus login phone number
                        </Tooltip>
                      </Label>
                      <Field
                        className="form-control"
                        name="phoneNumber"
                      ></Field>
                      {errors.phoneNumber && touched.phoneNumber && (
                        <small
                          id="phoneNumber"
                          className="form-text text-muted text-error"
                        >
                          {errors.phoneNumber}.
                        </small>
                      )}
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Login
                    </Button>
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

export default LoginPage;
