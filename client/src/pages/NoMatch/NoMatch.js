import React from "react";
import {Container, Row, Col} from "reactstrap"

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <h1 className="text-center">404 Page Not Found</h1>
        <h1 className="text-center">
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
