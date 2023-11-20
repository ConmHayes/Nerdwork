import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const CommunityPage = () => {
  let { communityId } = useParams();
  // You would fetch community details based on communityId or pass it as a prop
  // For this example, we'll assume static data
  const communityDetails = {
    id: 'harry-potter',
    name: 'Harry Potter Fans',
    description: 'Discuss all things Harry Potter here!',
    topics: [
      { id: 1, title: 'Favorite Harry Potter book?' },
      { id: 2, title: 'Predictions for the next movie' },
      // ... more topics
    ],
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>{communityDetails.name}</Card.Title>
              <Card.Text>{communityDetails.description}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
              {communityDetails.topics.map((topic) => (
                <ListGroup.Item key={topic.id}>{topic.title}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityPage;
