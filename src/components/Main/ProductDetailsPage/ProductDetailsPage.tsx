import classnames from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  delCheckout, delFavorite, setCheckout, setFavorite, setPath,
} from '../../../store';
import {
  getCheckout, getDetailProduct, getFavorite,
} from '../../../store/selectors';
import { includeProd } from '../HomePage/HotPrice';
import { NewMobile } from '../HomePage/NewMobile';
import './ProductDetailsPage.scss';

export const ProductDetailsPage:React.FC = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(getDetailProduct);
  const favorite = useSelector(getFavorite);
  const checkout = useSelector(getCheckout);
  const [selectImg, setSelectImg] = useState(productDetails.imageUrl);

  return (
    <div className="prod_details">
      <div className="prod_details__path_container">
        <Link
          to="/"
          className="prodByCategories__link"
          onClick={() => dispatch(setPath('home'))}
        >
          <img
            className="prod_details__home_img"
            src="./images/Home.svg"
            alt=""
          />
        </Link>
        <img
          className="prod_details__right_img"
          src="./images/right.svg"
          alt=""
        />
        <Link
          to="phones"
          className="prod_details__path"
          onClick={() => dispatch(setPath('phones'))}
        >
          Phones
        </Link>
        <img
          className="prod_details__right_img"
          src="./images/right.svg"
          alt=""
        />
        <p className="prod_details__path">{productDetails.name}</p>
      </div>
      <p className="prod_details__title">{productDetails.name}</p>
      <div className="container">
        <div className="container__chose_img">
          {
            productDetails?.images?.map(item => (
              <img
                role="presentation"
                key={item}
                src={item}
                onClick={() => setSelectImg(item)}
                alt=""
                className="container__chose_img_image"
              />
            ))
          }
        </div>
        <div className="container__big_img">
          <img className="container__big_img_image" src={selectImg} alt="" />
        </div>
        <div className="container__about">
          <div className="container__about_colors">
            <p className="container__about_title">Available color</p>
            <div className="container__about_colors_container">
              <div className="container__about_colors_box">
                <span className="container__about_colors_purple">purple</span>
              </div>
              <div className="container__about_colors_box">
                <span className="container__about_colors_gray">gray</span>
              </div>
              <div className="container__about_colors_box">
                <span className="container__about_colors_black">black</span>
              </div>
              <div className="container__about_colors_box">
                <span className="container__about_colors_light_gray">
                  lightGray
                </span>
              </div>
            </div>
          </div>
          <div className="container__about_capacity_box">
            <p className="container__about_title">Select capacity</p>
            <p className="container__about_capacity">
              {productDetails.capacity}
            </p>
          </div>
          <div>
            <div className="mySlider__price_box border_none">
              <p className="mySlider__discount_price font_size">{`$${productDetails.price - ((productDetails.price * productDetails.discount) / 100)}`}</p>
              <p className="mySlider__price">{`$${productDetails.price}`}</p>
            </div>
            <div className="mySlider__button_box margin_bottom">
              <button
                className={classnames('mySlider__add_button button_width',
                  {
                    mySlider__checkout_btn:
                    includeProd(checkout, productDetails),
                  })}
                type="button"
                onClick={() => (includeProd(checkout, productDetails)
                  ? dispatch(delCheckout(productDetails))
                  : dispatch(setCheckout(productDetails)))}
              >
                {includeProd(checkout, productDetails)
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>
              <button
                className="mySlider__like_button"
                type="button"
                onClick={() => (includeProd(favorite, productDetails)
                  ? dispatch(delFavorite(productDetails))
                  : dispatch(setFavorite(productDetails)))}
              >
                { includeProd(favorite, productDetails)
                  ? <img src="./images/heart.png" alt="" />
                  : <img src="./images/Vector(Stroke).svg" alt="" />}
              </button>
            </div>
            <div className="mySlider__screen_box">
              <p className="mySlider__screen_title">Screen</p>
              <p className="mySlider__screen_info">{productDetails.screen}</p>
            </div>
            <div className="mySlider__capasity_box">
              <p className="mySlider__capasity_title">Capasity</p>
              <p className="mySlider__capasity_info">
                {productDetails.capacity}
              </p>
            </div>
            <div className="mySlider__ram_box">
              <p className="mySlider__ram_title">RAM</p>
              <p className="mySlider__ram_info">{productDetails.ram}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="prod_details__bottom">
        <div className="prod_details__bottom_left bottom_left">
          <p className="bottom_left__title">About</p>
          <hr className="bottom_left__hr" />
          <p className="bottom_left__description__title">Description</p>
          <p className="bottom_left__description">
            {productDetails.description}
          </p>
          <p className="bottom_left__description__title">Snippet</p>
          <p className="bottom_left__description">
            {productDetails.snippet}
          </p>
        </div>
        <div className="prod_details__bottom_right bottom_right">
          <p className="bottom_left__title">Tech specs</p>
          <hr className="bottom_left__hr" />
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">Screen</p>
            <p className="bottom_right__tech_value">{productDetails.screen}</p>
          </div>
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">Resolution</p>
            <p className="bottom_right__tech_value">
              {productDetails.display?.screenResolution}
            </p>
          </div>
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">Processor</p>
            <p className="bottom_right__tech_value">
              {productDetails.hardware?.cpu}
            </p>
          </div>
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">RAM</p>
            <p className="bottom_right__tech_value">{productDetails.ram}</p>
          </div>
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">Built in memory</p>
            <p className="bottom_right__tech_value">
              {productDetails.storage?.ram}
            </p>
          </div>
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">Camera</p>
            <p className="bottom_right__tech_value">
              {productDetails.camera?.primary}
            </p>
          </div>
          <div className="bottom_right__tech_box">
            <p className="bottom_right__tech_name">Bluetooth</p>
            <p className="bottom_right__tech_value">
              {productDetails.connectivity?.bluetooth}
            </p>
          </div>
        </div>
      </div>
      <NewMobile />
    </div>
  );
};
