import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer:React.FC = () => {
  return (
    <footer className="footer">
      <Link
        to="/"
        className="footer__logo"
      >
        <img src="./images/LOGO.svg" alt="" />
      </Link>
      <div>
        <a
          className="footer__link"
          href="https://github.com/Andriyk0"
        >
          GITHUB
        </a>
        <a className="footer__link" href="/">CONTACTS</a>
        <a className="footer__link" href="/">RIGTHS</a>
      </div>
      <div className="footer__back-to-top">
        <p>Back to top</p>
        <button
          className="footer__top-link"
          onClick={goToTop}
          type="button"
        >
          <img src="./images/top.svg" alt="back to top" />
        </button>
      </div>
    </footer>
  );
};
