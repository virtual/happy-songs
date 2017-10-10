import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Feature = (props) => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Happy Music</h1>
          <p className="lead">Change the course of your mood with these happy tunes.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};
export default Feature;