import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const BookCard = ({ book }) => {
  const { title, img, author, genres, owner, rating } = book;

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < Math.floor(rating) ? 'text-warning' : 'text-secondary'}>
      ★
    </span>
  ));

  return (
    <Card className="h-100 shadow-sm bg-white rounded">
      <Card.Body className="d-flex flex-column">
        <Card.Img variant="top" src={img} alt={title} />
        <Card.Title className="mb-0 font-weight-bold">{title}</Card.Title>
        <Card.Text className="text-secondary">{author}</Card.Text>
        <Card.Text>
          {genres.map((genre, index) => (
            <Badge key={index} pill className="mr-1" bg="secondary">
              {genre}
            </Badge>
          ))}
        </Card.Text>
        <div className="mt-auto">
          <div className="small text-muted">Owner: {owner}</div>
          <div>{stars}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
