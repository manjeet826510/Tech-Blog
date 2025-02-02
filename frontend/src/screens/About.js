import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Tech Blog</title>
      </Helmet>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h1 className="text-center text-4xl font-bold mb-4">About Us</h1>

        <Row>
          <Col md={6}>
            <Card style={{ marginBottom: "1rem" }}>
              <Card.Body>
                <Card.Title className="text-2xl font-semibold">Who We Are</Card.Title>
                <Card.Text>
                  Welcome to Tech Blog, your ultimate destination for staying updated with the latest trends in technology.
                  Our goal is to provide insightful articles, expert opinions, and guides to help you navigate the ever-evolving world of tech.
                  Whether you're a developer, a tech enthusiast, or someone looking to stay informed, we have something for everyone.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card style={{ marginBottom: "1rem" }}>
              <Card.Body>
                <Card.Title className="text-2xl font-semibold">What We Do</Card.Title>
                <Card.Text>
                  At Tech Blog, we cover a wide range of topics related to software development, emerging technologies, industry news, and more.
                  Our team of contributors is passionate about sharing their knowledge and experience to help others grow and stay up to date.
                  From in-depth tutorials to quick tips, we aim to inspire and educate our readers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-2xl font-semibold">Join Us</Card.Title>
                <Card.Text>
                  Want to contribute? We are always looking for new voices and fresh perspectives. If you're passionate about tech and enjoy writing, 
                  feel free to reach out to us! We would love to have you on board as a contributor.
                </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
