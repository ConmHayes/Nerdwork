import React, { useState } from 'react';
import { NavigationBar, TradeRequest, Bookshelf } from '../../components';

// Initial hardcoded data
const initialBooks = [
  // give me random books
  {
    id: 1,
    title: 'The Hobbit',
    img: '',
    author: 'J.R.R. Tolkien',
    genres: ['Fantasy'],
    owner: 'John Doe',
    rating: 4.5
  },
  {
    id: 2,
    title: 'The Lord of the Rings',
    img: '',
    author: 'J.R.R. Tolkien',
    genres: ['Fantasy'],
    owner: 'John Doe',
    rating: 4.5
  },
  {
    id: 3,
    title: 'Harry Potter and the Chamber of Secrets',
    img: '',
    author: 'J.K. Rowling',
    genres: ['Fantasy'],
    owner: 'John Doe',
    rating: 4.5
  },
  {
    id: 4,
    title: 'Harry Potter and the Prisoner of Azkaban',
    img: '',
    author: 'J.K. Rowling',
    genres: ['Fantasy'],
    owner: 'John Doe',
    rating: 4.5
  },
  {
    id: 5,
    title: 'Harry Potter and the Goblet of Fire',
    img: '',
    author: 'J.K. Rowling',
    genres: ['Fantasy'],
    owner: 'John Doe',
    rating: 4.5
  },
  {
    id: 6,
    title: 'Harry Potter and the Order of the Phoenix',
    img: '',
    author: 'J.K. Rowling',
    genres: ['Fantasy'],
    owner: 'John Doe',
    rating: 4.5
  },
];

const RequestPage = () => {
  // State to keep track of books
  const [books, setBooks] = useState(initialBooks);

  const handleTradeRequest = (selectedBookId, selectedDate) => {
    // Find the book in the books array
    const bookToTrade = books.find(book => book.id === selectedBookId);
    if (bookToTrade) {
      // Perform trade logic here, for example, mark the book as traded
      bookToTrade.traded = true;

      // For simplicity, we'll just log the trade details
      console.log(`Book traded: ${bookToTrade.title} on date: ${selectedDate}`);
      // If you want to update the state with the trade details, you'd
      // set a new state here
      setBooks([...books]);
    }
  };

  return (
    <div>
      <NavigationBar />
      <Bookshelf items={books} />
      <TradeRequest books={books} onTradeRequest={handleTradeRequest} />
    </div>
  );
};

export default RequestPage;
