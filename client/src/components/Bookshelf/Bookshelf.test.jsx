import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import Bookshelf from '.'; 

expect.extend(matchers);

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

describe('Bookshelf Component', () => {
  beforeEach(() => {
    render(<Bookshelf />);
  });

  afterEach(cleanup);

  it('should render the correct number of BookCard components', () => {
    const bookCards = screen.getAllByTestId('book-card');
    expect(bookCards).toHaveLength(booksData.length);
  });

  it('should display the correct title for each book', () => {
    booksData.forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  it('should display the correct author for each book', () => {
    booksData.forEach(book => {
      expect(screen.getByText(book.author)).toBeInTheDocument();
    });
  });

  // Add more tests for other properties like genres, owner, and rating if needed
});

