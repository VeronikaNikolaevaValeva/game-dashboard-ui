import PageLayout from "../building_blocks/layout/PageLayout";
import React, { useState, Component } from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function LandingPage() {
  return (
    <PageLayout>
      <>
        <Container style={{ paddingTop: "3.2rem", paddingBottom: "3.2rem" }}>
          <Row className="d-flex align-items-stretch">
            <Card className="bg-dark text-white" border="primary" style={{ height: "100%", width: "100%" }}>
              <Card.Title
                class="d-flex justify-content-center"
                style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
                <h1>QUIZ GAME</h1>
              </Card.Title>
            </Card>
          </Row>
        </Container>
      </>
    </PageLayout>
  );
}

export default LandingPage;
