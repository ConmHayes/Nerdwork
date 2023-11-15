import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import NavigationBar from '.';

expect.extend(matchers);

describe('NavigationBar Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );
  });

  afterEach(cleanup);

  const links = [
    { to: '/home', text: 'Home' },
    { to: '/books', text: 'Books' },
    { to: '/comic_books', text: 'Comic Books' },
    { to: '/games', text: 'Games' },
    { to: '/profile', text: 'Profile' },
    { to: '/', text: 'Logout' }
  ];

  links.forEach(link => {
    it(`should have a link to ${link.text}`, () => {
      expect(screen.getByText(link.text).closest('a')).toHaveAttribute('href', link.to);
    });
  });

  it('should highlight the active link', async () => {
    // Note: This test may require adjustment based on your routing and active link styling logic.
    const user = userEvent.setup();
    const homeLink = screen.getByText('Home').closest('a');

    await user.click(homeLink);

    expect(homeLink).toHaveClass('nav-link-active');
    // Add checks for other links if necessary
  });

  // Add more tests as needed
});
