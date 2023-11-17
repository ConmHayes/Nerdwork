import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const communityData = [
  {
    id: 'harry-potter',
    name: 'Harry Potter Fans',
    description: 'A community for all the Harry Potter enthusiasts out there.',
  },
  // ... other communities
];

const CommunitiesPage = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        {communityData.map((community) => (
          <Col key={community.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={community.image} />
              <Card.Body>
                <Card.Title>{community.name}</Card.Title>
                <Card.Text>{community.description}</Card.Text>
                <Link to={`/community/${community.id}`} className="btn btn-primary">
                  Visit Community
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CommunitiesPage;
