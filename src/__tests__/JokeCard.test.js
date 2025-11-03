import React from 'react';
import { render, screen } from '@testing-library/react';
import JokeCard from '../JokeCard';

test('renders JokeCard with joke text and category', () => {
  const joke = { id: 1, joke: 'Test joke', categories: ['dev'] };
  const likeJoke = jest.fn();
  const unlikeJoke = jest.fn();

  render(<JokeCard joke={joke} likeJoke={likeJoke} unlikeJoke={unlikeJoke} index={0} />);

  expect(screen.getByText(/Test joke/i)).toBeInTheDocument();
  expect(screen.getByText(/dev/i)).toBeInTheDocument();
});
