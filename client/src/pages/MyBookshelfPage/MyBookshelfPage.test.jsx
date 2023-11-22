import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyBookshelfPage from '.';

describe('MyBookshelfPage Component', () => {
  beforeEach(() => {
    // Set the necessary localStorage value
    window.localStorage.setItem('shelf', 'book');

    render(
      <MemoryRouter>
        <MyBookshelfPage />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  const getByClassName = (container, className) => {
    return container.querySelector(`.${className}`);
  };

  it('renders the bookshelf container', () => {
    const { container } = render(
      <MemoryRouter>
        <MyBookshelfPage />
      </MemoryRouter>
    );
    const bookshelfContainer = getByClassName(container, 'bookshelf-container');
    expect(bookshelfContainer).toBeDefined();
  });

  it('renders the add book button', () => {
    const addBookButton = screen.getByText(/Add another book/i);
    expect(addBookButton).toBeDefined();
  });

//   it('opens the form to add a new book when the add book button is clicked', () => {
//     const addBookButton = screen.getByText(/Add another book/i);
//     fireEvent.click(addBookButton);
//     const addBookForm = screen.getByText(/Add a book to your shelf/i);
//     expect(addBookForm).toBeDefined();
//   });

//   it('renders the main components', () => {
//     expect(screen.getByText(/Your Books/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /add_circle/i })).toBeInTheDocument();
//     // Add other main components checks
//   });

//   it('opens the form to add a new book when the add book button is clicked', async () => {
//     // This line assumes your add button has data-testid="add-book-button"
//     fireEvent.click(screen.getByTestId('add-book-button'));
  
//     // Use the exact text from your component
//     await waitFor(() => {
//       expect(screen.getByText(/Exact text from your modal/i)).toBeInTheDocument();
//     });
//   });
  

  // Add more tests as necessary
});
