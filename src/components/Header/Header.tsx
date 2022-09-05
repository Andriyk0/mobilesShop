import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import classname from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCheckout, getFavorite, getPath,
} from '../../store/selectors';
import { setPath } from '../../store';

export const Header:React.FC = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const checkout = useSelector(getCheckout);
  const path = useSelector(getPath);
  const pathArray = ['home', 'phones', 'tablets', 'accessories'];

  useEffect(() => {
    const linkhreff = window.location.href;
    let staticHref = 'home';

    if (linkhreff !== 'http://localhost:3000/#/') {
      staticHref = linkhreff.replace('http://localhost:3000/#/', '');
    }

    dispatch(setPath(staticHref));
  }, []);

  return (
    <nav className="navbar" id="header">
      <div>
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => dispatch(setPath('home'))}
        >
          <img src="./images/LOGO.svg" alt="" />
        </Link>
        {pathArray.map((linkpath:string) => (
          <Link
            key={linkpath}
            to={linkpath}
            className={classname('navbar__link',
              { 'navbar__is-active navbar__link-active': path === linkpath })}
            onClick={() => dispatch(setPath(linkpath))}
          >
            {linkpath}
          </Link>
        ))}
      </div>
      <div className="navbar__right-box">
        <Link
          to="liked_product"
          className={classname('navbar__liked',
            {
              'navbar__is-active navbar__link-active': path === 'liked_product',
            })}
          onClick={() => dispatch(setPath('liked_product'))}
        >
          <img
            src={path === 'liked_product'
              ? './images/heart.png'
              : './images/Vector(Stroke).svg'}
            alt=""
          />
          {
            favorite.length > 0 && path !== 'liked_product' && (
              <div className="numberOfFavorite">{favorite.length}</div>
            )
          }
        </Link>
        <Link
          to="checkout"
          className={classname('navbar__checkout',
            { 'navbar__is-active navbar__link-active': path === 'checkout' })}
          onClick={() => dispatch(setPath('checkout'))}
        >
          <img src="./images/Shoppingbag(Cart).svg" alt="" />
          {
            checkout.length > 0 && path !== 'checkout' && (
              <div className="numberOfFavorite">{checkout.length}</div>
            )
          }
        </Link>
      </div>
    </nav>
  );
};
