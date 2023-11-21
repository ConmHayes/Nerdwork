import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import BookSearchWidget from ".";


global.fetch = vi.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({ results: { books: mockBooks } }),
})
);
  vi.mock( "../BookSearchCard", () => ({
    default: (props) => <div data-testid="book-search-card" {...props} />
  }));

  vi.mock("../SearchForm", () => ({
    default: (props) => <div data-testid="search-form" {...props} />
  }));

const mockBooks = [
    { primary_isbn10: '1234567890', title: 'Book 1' },
    { primary_isbn10: '0987654321', title: 'Book 2' }
  ];
  


describe("BookSearchWidget",() => {
    beforeEach(() => {
        render(<BookSearchWidget />);
      });
    
      afterEach(cleanup);
      it('renders correctly and calls fetch on mount', async () => {
        expect(fetch).toHaveBeenCalled();
      });

      it('renders SearchForm', () => {
       
        const searchForm = screen.getByTestId('search-form');
        expect(searchForm).toBeInTheDocument();
      });

      // it('renders BookSearchCards', () => {
      //   const bookCards = screen.getAllByTestId('book-search-card');
      //   expect(bookCards.length).toBeGreaterThan(0); // Assuming there are books to render
      // });
})