import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { render, screen, waitFor, cleanup } from '@testing-library/react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';

import Auth from './Auth';

describe('Trainer settings page', () => {
  jest.mock('axios');

  const exampleUser = {
    name: 'bert',
    email: 'bert@bertmail.com',
    password: 'Bertissocool1994$$%',
  };

  beforeEach(async () => {
    axios.post = jest.fn((url, body) => {
      console.log({ url, body });
      if (url === 'api/user/register' && body.email === exampleUser.email) {
        return Promise.resolve({
          data: { user: exampleUser, token: '37#b4%fdhrd4#l$ik%$3^3gh54k@3' },
        });
      }
    });

    render(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Auth />
        </PersistGate>
      </Provider>
    );
  });

  it('registers a user', async () => {
    const inputs = screen.getAllByTestId('input');
    userEvent.type(inputs[0], exampleUser.name);
    userEvent.type(inputs[1], exampleUser.email);
    userEvent.type(inputs[2], exampleUser.password);
    userEvent.type(inputs[3], exampleUser.password);

    const btn = screen.getByText('Submit');
    userEvent.click(btn);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledTimes(1);
    waitFor(() => expect(screen.findByText(`Welcome, ${exampleUser.name}`)));
  });
});
