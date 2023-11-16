import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import TradeRequest from '.'; // Adjust the import path as necessary

expect.extend(matchers);

describe('TradeRequest Component', () => {
  let mockTradeRequests = [];

  const mockOnTradeRequest = (book, date) => {
    mockTradeRequests.push({ book, date });
  };

  beforeEach(() => {
    mockTradeRequests = []; // Reset the mock calls before each test
    render(<TradeRequest onTradeRequest={mockOnTradeRequest} />);
  });

  afterEach(cleanup);

  it('renders the form', () => {
    expect(screen.getByLabelText('Choose a book to trade:')).toBeInTheDocument();
    expect(screen.getByLabelText('Suggested Swap Date:')).toBeInTheDocument();
  });

  it('allows input to be entered', async () => {
    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole('combobox'), 'book1');
    await user.type(screen.getByLabelText('Suggested Swap Date:'), '2023-05-01');
    
    expect(screen.getByRole('combobox')).toHaveValue('book1');
    expect(screen.getByLabelText('Suggested Swap Date:')).toHaveValue('2023-05-01');
  });

  it('shows an alert if the form is submitted without selecting a book and date', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('Make Request'));

    expect(screen.getByText('Please select a book and a date to make a trade request.')).toBeInTheDocument();
  });

  it('calls onTradeRequest with the correct data when the form is submitted', async () => {
    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole('combobox'), 'book1');
    await user.type(screen.getByLabelText('Suggested Swap Date:'), '2023-05-01');
    await user.click(screen.getByText('Make Request'));

    expect(mockTradeRequests).toEqual([{ book: 'book1', date: '2023-05-01' }]);
  });

  // Add more tests as needed
});
