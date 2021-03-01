import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Auth from './Auth';

describe('Trainer settings page', () => {
  jest.mock('axios');

  const exampleUser = {
    name: 'bert',
    email: 'bert@bertmail.com',
    _id: '123',
  };

  axios.post = jest.fn((url) => {
    if (url === '/api/user/register') {
      Promise.resolve({
        data: { user: exampleUser, token: '37#b4%fdhrd4#l$ik%$3^3gh54k@3' },
      });
    }
  });

  beforeEach(async () => {
    render(<Auth />);
  });

  it('registers a user', async () => {
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledTimes(1);
    waitFor(() => expect(screen.findByText(`Welcome, ${exampleUser.name}`)));
  });
});
