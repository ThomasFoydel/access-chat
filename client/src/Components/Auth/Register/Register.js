import React from 'react';

import { Button } from 'reakit/Button';
import { css } from '@emotion/css';
import { Level, H } from 'react-accessible-headings';
import PropTypes from 'prop-types';
import InputGroup from 'Components/InputGroup/InputGroup';

const Register = ({
  props: { registerForm, setRegisterForm, registerRequest, setShow },
}) => {
  const handleRegisterForm = ({ target: { id, value } }) => {
    setRegisterForm((form) => ({ ...form, [id]: value }));
  };

  return (
    <form className={registerCss}>
      <H className='header'>Register</H>
      <Level>
        <InputGroup
          props={{
            handleForm: handleRegisterForm,
            form: registerForm,
            inputs: registerInputs,
          }}
        />

        <Button onClick={registerRequest}>Submit</Button>
        <Button className='login' onClick={() => setShow('login')}>
          I already have an account
        </Button>
      </Level>
    </form>
  );
};
// $small: 576px;
// $medium: 768px;
// $large: 992px;

const registerCss = css`
  color: white;
  border: 2px solid white;
  width: 90vw;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 2rem 1rem;

  button {
    font-size: 2.5rem;
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    background: #d2d2d2;
    border-radius: 0.3rem;
    border-color: #d2d2d2;
    font-weight: bold;
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

const registerInputs = [
  { placeholder: 'name', id: 'name', name: 'name', type: 'text' },
  { placeholder: 'email', id: 'email', name: 'email', type: 'text' },
  {
    placeholder: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
  },
  {
    placeholder: 'confirm password',
    id: 'confirmpassword',
    name: 'confirm password',
    type: 'password',
  },
];

Register.propTypes = {
  props: PropTypes.shape({
    registerForm: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmpassword: PropTypes.string.isRequired,
    }),
    setRegisterForm: PropTypes.func.isRequired,
    registerRequest: PropTypes.func.isRequired,
    setShow: PropTypes.func.isRequired,
  }),
};

export default Register;
