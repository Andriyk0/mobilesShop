import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  delCheckout, delFavorite, setCheckout, setDetailProduct, setFavorite, setPath,
} from '../../../store';
import { getCheckout, getFavorite } from '../../../store/selectors';
import { includeProd } from '../HomePage/HotPrice';
import './LikedProductPage.scss';
import { goToTop } from '../../Footer';

export const LikedProductPage:React.FC = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const checkout = useSelector(getCheckout);

  const goToProductDetails = (product:Product) => {
    dispatch(setDetailProduct(product));
    dispatch(setPath('product_details'));
  };

  return (
    <div className="phones">
      <div className="phones__path_container">
        <Link
          to="/"
          className="prodByCategories__link"
          onClick={() => dispatch(setPath('home'))}
        >
          <img className="phones__home_img" src="./images/Home.svg" alt="" />
        </Link>
        <img className="phones__right_img" src="./images/right.svg" alt="" />
        <p className="phones__path">Favourites</p>
      </div>
      <p className="phones__title">Favourites</p>
      <p className="phones__numberOfPhones">{`${favorite.length} items`}</p>
      <div className="cards">
        {
          favorite.map(item => (
            <div className="mySlider__product_box" key={item.id}>
              <div className="mySlider__image_box">
                <Link
                  key={item.id}
                  onClick={() => {
                    goToProductDetails(item);
                    goToTop();
                  }}
                  to="product_details"
                >
                  <img
                    className="mySlider__image"
                    src={item.imageUrl}
                    alt=""
                  />
                </Link>
              </div>
              <p className="mySlider__name">{item.name}</p>
              <div className="mySlider__price_box">
                <p className="mySlider__discount_price">{`$${item.price - ((item.price * item.discount) / 100)}`}</p>
                <p className="mySlider__price">{`$${item.price}`}</p>
              </div>
              <div className="mySlider__screen_box">
                <p className="mySlider__screen_title">Screen</p>
                <p className="mySlider__screen_info">{item.screen}</p>
              </div>
              <div className="mySlider__capasity_box">
                <p className="mySlider__capasity_title">Capasity</p>
                <p className="mySlider__capasity_info">{item.capacity}</p>
              </div>
              <div className="mySlider__ram_box">
                <p className="mySlider__ram_title">RAM</p>
                <p className="mySlider__ram_info">{item.ram}</p>
              </div>
              <div className="mySlider__button_box">
                <button
                  className={classnames('mySlider__add_button',
                    { mySlider__checkout_btn: includeProd(checkout, item) })}
                  type="button"
                  onClick={() => (includeProd(checkout, item)
                    ? dispatch(delCheckout(item))
                    : dispatch(setCheckout(item)))}
                >
                  {includeProd(checkout, item)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  className="mySlider__like_button"
                  type="button"
                  onClick={() => (includeProd(favorite, item)
                    ? dispatch(delFavorite(item))
                    : dispatch(setFavorite(item)))}
                >
                  { includeProd(favorite, item)
                    ? <img src="./images/heart.png" alt="" />
                    : <img src="./images/Vector(Stroke).svg" alt="" />}
                </button>
              </div>
            </div>
          ))
        }
      </div>
      {
        favorite.length === 0 && (
          <p className="noProduct">No Favourites</p>
        )
      }
    </div>
  );
};
