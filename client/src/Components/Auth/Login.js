import React from 'react';

import { Button } from 'reakit/Button';
import { css } from '@emotion/css';
import { Level, H } from 'react-accessible-headings';
import PropTypes from 'prop-types';

import InputGroup from 'Components/InputGroup/InputGroup';

const Login = ({
  props: { loginForm, setLoginForm, loginRequest, setShow, close },
}) => {
  const handleLoginForm = ({ target: { id, value } }) => {
    setLoginForm((form) => ({ ...form, [id]: value }));
  };

  return (
    <form className={loginCss}>
      <H className='header'>Login</H>
      <Button onClick={() => close()} className='close-btn'>
        close
      </Button>
      <Level>
        <InputGroup
          props={{
            handleForm: handleLoginForm,
            form: loginForm,
            inputs: loginInputs,
          }}
        />

        <Button onClick={loginRequest} className='submit-btn'>
          Submit
        </Button>
        <Button className='login' onClick={() => setShow('register')}>
          Sign up
        </Button>
      </Level>
    </form>
  );
};
// $small: 576px;
// $medium: 768px;
// $large: 992px;

const loginCss = css`
  color: white;
  border: 2px solid white;
  width: 100vw;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 2rem 1rem;

  .submit-btn {
    font-size: 2.5rem;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    background: #d2d2d2;
    border-radius: 0.3rem;
    border-color: #d2d2d2;
    font-weight: bold;
  }
  .close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  label {
    font-size: 1.8rem;
  }
  .header {
    font-size: 4rem;
    letter-spacing: 0.3rem;
    text-align: center;
    background: red;
    padding: 0 0.3rem;
  }

  input {
    display: block;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.25em 0.5em;
    font-size: 1.8rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
    color: #4d4d4d;
    box-sizing: border-box;
    color: red;
    margin: 0.2rem 0rem;
    &:focus {
      border-color: rgba(0, 0, 0, 0.25);
    }
  }

  .login {
    font-size: 1.2rem;
    padding: 1rem;
    margin-top: 1rem;
  }

  //   @media (min-width: 576px) {
  //     font-size: 20px;
  //   }
`;

const loginInputs = [
  { placeholder: 'email', id: 'email', name: 'email', type: 'text' },
  {
    placeholder: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
  },
];

Login.propTypes = {
  props: PropTypes.shape({
    loginForm: PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    setLoginForm: PropTypes.func.isRequired,
    loginRequest: PropTypes.func.isRequired,
    setShow: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  }),
};

export default Login;
