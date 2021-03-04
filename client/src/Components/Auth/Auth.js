import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register/Register';
import { connect } from 'react-redux';
import { login } from 'redux/auth/actions';
import { Button } from 'reakit/Button';
import { css } from '@emotion/css';
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from 'reakit/Dialog';
import { persistor } from 'redux/store';

const Auth = ({ login, loggedIn }) => {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmpassword: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState('register');
  const [err, setErr] = useState('');
  const authDialog = useDialogState();

  const setAuth = (user) => {
    login(user);
    authDialog.hide();
  };

  const registerRequest = () => {
    axios
      .post('api/user/register', registerForm)
      .then(({ data }) => setAuth(data))
      .catch(
        ({
          response: {
            data: { err },
          },
        }) => {
          setErr(err);
        }
      );
  };

  const loginRequest = () => {
    axios
      .post('api/user/login', loginForm)
      .then(({ data }) => setAuth(data))

      .catch(
        ({
          response: {
            data: { err },
          },
        }) => {
          setErr(err);
        }
      );
  };

  return (
    <li className={authCss}>
      {loggedIn ? (
        <Button onClick={() => persistor.purge()} className='auth-btn'>
          Log Out
        </Button>
      ) : (
        <DialogDisclosure {...authDialog} className='auth-btn'>
          Sign in
        </DialogDisclosure>
      )}
      <DialogBackdrop {...authDialog}>
        <Dialog {...authDialog} aria-label='Authentication'>
          {show === 'register' ? (
            <Register
              props={{
                registerForm,
                setRegisterForm,
                registerRequest,
                setShow,
                close: authDialog.hide,
              }}
            />
          ) : (
            <Login
              props={{
                loginForm,
                setLoginForm,
                loginRequest,
                setShow,
                close: authDialog.hide,
              }}
            />
          )}
          <div>{err}</div>
        </Dialog>
      </DialogBackdrop>
    </li>
  );
};

const authCss = css`
  list-style: none;
  .backdrop {
    max-width: 90%;
    background: red;
  }
  .auth-btn {
    background: none;
    border: none;
    font-size: 2rem;
    &:hover {
      background: red;
    }
  }
`;

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
