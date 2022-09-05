import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPath } from '../../../../store';
import { getAllProductsInfo } from '../../../../store/selectors';
import { goToTop } from '../../../Footer';
import './ProdByCategories.scss';

export const ProdByCategories:React.FC = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(getAllProductsInfo);
  const phones = [...allProducts].filter(item => item.type === 'phone');
  const tablets = [...allProducts].filter(item => item.type === 'tablet');
  const accsessories = [...allProducts]
    .filter(item => item.type === 'accsessorie');

  return (
    <div className="prodByCategories">
      <p className="prodByCategories__title">Shop by category</p>
      <div className="prodByCategories__container">
        <Link
          to="phones"
          className="prodByCategories__link"
          onClick={() => {
            dispatch(setPath('phones'));
            goToTop();
          }}
        >
          <div className="prodByCategories__mobile_box">
            <img
              src="./images/image6.svg"
              className="prodByCategories__image"
              alt=""
            />
          </div>
          <p className="prodByCategories__image_title">Mobile phones</p>
          <p className="prodByCategories__number_of_products">{`${phones.length} models`}</p>
        </Link>
        <Link
          to="tablets"
          className="prodByCategories__link"
          onClick={() => {
            dispatch(setPath('tablets'));
            goToTop();
          }}
        >
          <div className="prodByCategories__tablet_box">
            <img
              src="./images/image5.svg"
              className="prodByCategories__image"
              alt=""
            />
          </div>
          <p className="prodByCategories__image_title">Tablets</p>
          <p className="prodByCategories__number_of_products">{`${tablets.length} models`}</p>
        </Link>
        <Link
          to="accessories"
          className="prodByCategories__link"
          onClick={() => {
            dispatch(setPath('accessories'));
            goToTop();
          }}
        >
          <div className="prodByCategories__accesories_box">
            <img
              src="./images/image7.svg"
              className="prodByCategories__image"
              alt=""
            />
          </div>
          <p className="prodByCategories__image_title">Accessories</p>
          <p className="prodByCategories__number_of_products">{`${accsessories.length} models`}</p>
        </Link>
      </div>
    </div>
  );
};
