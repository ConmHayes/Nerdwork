import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import RequestPage from '.'; // Adjust the import path as necessary
import { NavigationBar, Bookshelf, TradeRequest } from '../../components';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

describe('RequestPage Component', () => {
  beforeEach(() => {
    render(
      <Router> {/* Wrap RequestPage with BrowserRouter */}
        <RequestPage />
      </Router>
    );
  });

  afterEach(() => {
    // Cleanup if needed
  });

  it('renders the RequestPage component', () => {
    const requestPage = screen.getByText('Handle trade request with data:');
    expect(requestPage).toBeInTheDocument();
  });

  it('renders the NavigationBar component', () => {
    const navigationBar = screen.getByText('Nerdwork');
    expect(navigationBar).toBeInTheDocument();
  });

  it('renders the Bookshelf component', () => {
    const bookshelf = screen.getByText('Bookshelf');
    expect(bookshelf).toBeInTheDocument();
  });

  it('renders the TradeRequest component', () => {
    const tradeRequest = screen.getByText('Make Request');
    expect(tradeRequest).toBeInTheDocument();
  });

  // Add more tests as needed for other child components
});
