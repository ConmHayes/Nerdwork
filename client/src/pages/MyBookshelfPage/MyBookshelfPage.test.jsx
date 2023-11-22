import React from 'react';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyBookshelfPage from '.';

describe('MyBookshelfPage Component', () => {
  beforeEach(() => {
    // Mock any necessary data here
    render(
      <MemoryRouter>
        <MyBookshelfPage />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it('renders the bookshelf container', () => {
    const bookshelfContainer = screen.getByTestId('bookshelf-container');
    expect(bookshelfContainer).toBeDefined();
  });

  // it('opens and closes the add book modal', async () => {
  //   const addBookButton = screen.getByText(/Add another/i);
  //   fireEvent.click(addBookButton);

  //   await waitFor(() => {
  //     const modalText = screen.getByText(/Add a new book to your collection!/i);
  //     expect(modalText).toBeDefined();
  //   });

  //   const closeButton = screen.getByRole('button', { name: /close/i });
  //   fireEvent.click(closeButton);

  //   await waitFor(() => {
  //     expect(screen.queryByText(/Add a new book to your collection!/i)).not.toBeInTheDocument();
  //   });
  // });

  // More tests...
});
