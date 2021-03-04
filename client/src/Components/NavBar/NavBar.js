import React from 'react';
import Auth from 'Components/Auth/Auth';
import { Level, H } from 'react-accessible-headings';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className={navCss}>
      <H className='heading'>Access Chat</H>
      <Level>
        <ul>
          <li>
            <Link className='link' to='/messages'>
              Messages
            </Link>
          </li>
        </ul>
        <Auth />
      </Level>
    </nav>
  );
};
// $small: 576px;
// $medium: 768px;
// $large: 992px;
const navCss = css`
  background: red;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  ul {
    list-style: none;
  }

  .heading,
  .link {
    font-size: 1.8rem;
    color: black;
    text-decoration: none;
    font-weight: bold;
  }

  @media (min-width: 576px) {
    .heading {
      font-size: 4rem;
    }
  }
`;

export default NavBar;
