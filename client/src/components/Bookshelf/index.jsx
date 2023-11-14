import React from 'react';
import BookCard from '../../components/BookCard';
import { Container, Row, Col } from 'react-bootstrap';

// Temporary hardcoded data
const booksData = [
  {
    id: 1,
    title: 'Legends and Lattes',
    img: 'https://m.media-amazon.com/images/I/51rZIPlsYjL._SY445_SX342_.jpg',
    author: 'Travis Baldree',
    genres: ['Fiction', 'Fantasy', 'Hopeful', 'Lighthearted', 'Relaxing'],
    owner: 'Example_User_2',
    rating: 4.5
  },
  {
    id: 2,
    title: 'Harry Potter and the Order of the Phoenix',
    img: 'https://images-na.ssl-images-amazon.com/images/I/51UoqRAxwEL._SX331_BO1,204,203,200_.jpg',
    author: 'J.K. Rowling',
    genres: ['Fiction', 'Fantasy', 'Adventure', 'Young Adult'],
    owner: 'Example_User_1',
    rating: 5
  },
  // ... more books
];

const Bookshelf = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        {booksData.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Bookshelf;
