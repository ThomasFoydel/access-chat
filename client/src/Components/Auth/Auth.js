import React, { useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register/Register';
import { connect } from 'react-redux';
import { login } from 'redux/auth/actions';

import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from 'reakit/Dialog';

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

  const registerRequest = () => {
    axios
      .post('api/user/register', registerForm)
      .then(({ data }) => login(data))
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
      .then(({ data }) => login(data))
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
  const authDialog = useDialogState();

  return (
    <>
      <DialogDisclosure {...authDialog}>Sign in Sign up</DialogDisclosure>
      <DialogBackdrop {...authDialog}>
        <Dialog {...authDialog} aria-label='Authentication'>
          {show === 'register' ? (
            <Register
              props={{
                registerForm,
                setRegisterForm,
                registerRequest,
                setShow,
              }}
            />
          ) : (
            <Login props={{ loginForm, setLoginForm, loginRequest, setShow }} />
          )}
          <div>{err}</div>
        </Dialog>
      </DialogBackdrop>
    </>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
