import CustomContainer from "components/Layouts/container.component";
import React from "react";
import { Card, CardBody, CardImg, Col, Container, Row } from "reactstrap";
import logo from "assets/img/log2.png";
import kukulu from "assets/img/kukulu.png";
import tras from "assets/img/tras.png";
import feta from "assets/img/fetalarge.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <CustomContainer>
      <Container className="vh-100  d-flex align-desk ">
        <Row className="shadow-sm mt-mob ">
          <Col lg={4} xs={12}>
            <div className="thumbnail p-4">
              <img src={logo} className="rounded img-fluid" alt="" />
            </div>
          </Col>
          <Col lg={8} className="">
            <div className="d-flex align-items-start  ">
              <div className="home_contet ">
                <div className="header">
                  <span className="header-head fw-bolder">Compete</span>
                  <span className="header-foot fw-bolder"> And win prizes</span>
                </div>
              </div>
            </div>
            <Row className="my-5 gy-5">
              <Col sm={12} md={4}>
                <Card>
                  <CardImg src={kukulu} />
                  <CardBody>
                    <Link
                      to="/kukulu"
                      className="btn btn-primary rounded w-100"
                    >
                      Join
                    </Link>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card>
                  <CardImg src={tras} />
                  <CardBody>
                    <Link to="#" className="btn  rounded w-100 fredoka">
                      Comeing soon..
                    </Link>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card>
                  <CardImg src={feta} />
                  <CardBody>
                    <Link to="#" className="btn  rounded w-100 fredoka">
                      Comeing soon..
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </CustomContainer>
  );
};

export default HomePage;
