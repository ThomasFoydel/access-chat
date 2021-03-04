import React from 'react';
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
      if (url === 'api/user/register' && body.email === exampleUser.email) {
        return Promise.resolve({
          data: { user: exampleUser, token: '37#b4%fdhrd4#l$ik%$3^3gh54k@3' },
        });
      }
      if (url === 'api/user/login' && body.email === exampleUser.email) {
        return Promise.resolve({
          data: {
            user: exampleUser,
            token: '37#b4%fdhrd4#l$ik%$3^3gh54k@3',
          },
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

  afterEach(() => cleanup());

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
  });

  it('register and auth navigable with tab', async () => {
    expect(screen.getByText('Register'));
    const inputs = screen.getAllByTestId('input');
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(inputs[0]).toHaveFocus();
    userEvent.tab();
    expect(inputs[1]).toHaveFocus();
    userEvent.tab();
    expect(inputs[2]).toHaveFocus();
    userEvent.tab();
    expect(inputs[3]).toHaveFocus();
    userEvent.tab();
    const submitBtn = screen.getByText('Submit');
    expect(submitBtn).toHaveFocus();
    userEvent.tab();
    const goToLoginBtn = screen.getByText('I already have an account');
    expect(goToLoginBtn).toHaveFocus();
    userEvent.click(goToLoginBtn);
    expect(screen.getByText('Login'));
    const loginInputs = screen.getAllByTestId('input');
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(loginInputs[0]).toHaveFocus();
    userEvent.tab();
    expect(loginInputs[1]).toHaveFocus();
    userEvent.tab();
    const loginSubmitBtn = screen.getByText('Submit');
    expect(loginSubmitBtn).toHaveFocus();
    userEvent.tab();
    const goToRegisterBtn = screen.getByText('Sign up');
    expect(goToRegisterBtn).toHaveFocus();
    userEvent.click(goToRegisterBtn);
    expect(screen.getByText('Register'));
  });

  it('logs a user in', async () => {
    const signUpBtn = screen.getByText('I already have an account');
    userEvent.click(signUpBtn);
    const inputs = screen.getAllByTestId('input');

    userEvent.type(inputs[0], exampleUser.email);
    userEvent.type(inputs[1], exampleUser.password);

    const btn = screen.getByText('Submit');
    userEvent.click(btn);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
