import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  delCheckout, delFavorite, setCheckout, setDetailProduct, setFavorite, setPath,
} from '../../../store';
import { getCheckout, getFavorite, getTablets } from '../../../store/selectors';
import './TabletsPage.scss';
import { includeProd } from '../HomePage/HotPrice';
import { goToTop } from '../../Footer';

export const TabletsPage:React.FC = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorite);
  const checkout = useSelector(getCheckout);
  const phones = useSelector(getTablets);
  const [
    PhonesLength, setPhonesLength,
  ] = useState<(string | number)[]>(['All']);
  const sortPhonesCategory:string[]
    = ['All', 'Cheep', 'Expensive', 'New', 'Old'];
  const [sortValue, setSortValue] = useState<string>('All');
  const [itemValue, setItemValue] = useState('All');
  const [selectPage, setSelectPage] = useState<number>(1);
  const [showPhones, setShowPhones] = useState([...phones]);
  const [numberOfPage, setNumberOfPage] = useState([1]);

  const createNumberArr = () => {
    const arr = [];

    for (let i = 4; i <= phones.length; i += 4) {
      arr.push(i);
    }

    return setPhonesLength([...PhonesLength, ...arr]);
  };

  const sortPhones = (event:string) => {
    let rezult;

    if (event === 'Cheep') {
      rezult = [...phones].sort((a, b) => a.price - b.price);
    } else if (event === 'Expensive') {
      rezult = [...phones].sort((a, b) => b.price - a.price);
    } else if (event === 'New') {
      rezult = [...phones].sort((a, b) => a.age - b.age);
    } else if (event === 'Old') {
      rezult = [...phones].sort((a, b) => b.age - a.age);
    } else if (event === 'All') {
      rezult = [...phones];
    }

    return rezult;
  };

  const showPhonesOnPage
  = (num: number, item: number | string, sortV: string) => {
    const rezult = sortPhones(sortV);

    if (rezult && item !== 'All') {
      setShowPhones(rezult
        .splice(num * Number(item) - Number(item), num * Number(item)));
      setNumberOfPage(Array.from({
        length: Math.ceil(phones.length
        / Number(item)),
      }, (_, i) => i + 1));
      setSelectPage(num);
    } else if (rezult && item === 'All') {
      setShowPhones(rezult
        .splice(num * phones.length - phones.length, num * phones.length));
      setSelectPage(num);
      setNumberOfPage([1]);
    }
  };

  useEffect(() => {
    createNumberArr();
    setShowPhones([...phones]);
  }, [phones]);

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
        <p className="phones__path">Tablets</p>
      </div>
      <p className="phones__title">Tablets</p>
      <p className="phones__numberOfPhones">{`${phones.length} models`}</p>
      <div className="phones__filters">
        <div className="phones__sort">
          <label className="phones__label" htmlFor="categories">Sort by</label>
          <select
            className="phones__select_sort"
            id="categories"
            value={sortValue}
            onChange={(event) => {
              showPhonesOnPage(selectPage, itemValue, event.target.value);
              setSortValue(event.target.value);
            }}
          >
            { sortPhonesCategory.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="phones__sort">
          <label
            className="phones__label"
            htmlFor="numbersOfPhones"
          >
            Item on page
          </label>
          <select
            className="phones__select_item"
            id="numbersOfPhones"
            value={itemValue}
            onChange={(event) => {
              showPhonesOnPage(selectPage, event.target.value, sortValue);
              setItemValue(event.target.value);
            }}
          >
            { PhonesLength.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="cards">
        {
          showPhones.map(item => (
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
                    ? (
                      <img
                        src="./images/heart.png"
                        alt=""
                      />
                    ) : <img src="./images/Vector(Stroke).svg" alt="" />}
                </button>
              </div>
            </div>
          ))
        }
      </div>
      {
        phones.length === 0 && (
          <p className="noProduct">No Tablets</p>
        )
      }
      <div className="button">
        <button
          type="button"
          className="button__next_button"
        >
          <img src="./images/left.svg" alt="prev" />
        </button>
        {
          numberOfPage.map((item:number) => (
            <button
              key={item}
              type="button"
              onClick={() => showPhonesOnPage(item, itemValue, sortValue)}
              className={classnames('button__page',
                { 'button__page-active': item === selectPage })}
            >
              {item}
            </button>
          ))
        }
        <button
          type="button"
          className="button__prev_button"
        >
          <img src="./images/right.svg" alt="next" />
        </button>
      </div>
    </div>
  );
};
