import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { delCheckout, setDetailProduct, setPath } from '../../../store';
import { getCheckout } from '../../../store/selectors';
import { goToTop } from '../../Footer';
import './CheckoutPage.scss';

export const CheckoutPage:React.FC = () => {
  const dispatch = useDispatch();
  const checkout = useSelector(getCheckout);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState<Product[]>([]);

  const total = () => {
    let totalPr = 0;

    checkout.forEach(item => {
      totalPr += item.price;
    });

    setTotalPrice(totalPr);
  };

  const minus = (item: Product) => {
    setTotalPrice(totalPrice - item.price);
    const index = showCheckout.findIndex(obj => obj.id === item.id);

    const newObj = {
      ...item,
      count: item.count - 1,
    };

    showCheckout.splice(index, 1, newObj);
  };

  const plus = (item:Product) => {
    setTotalPrice(totalPrice + item.price);
    const index = showCheckout.findIndex(obj => obj.id === item.id);

    const newObj = {
      ...item,
      count: item.count + 1,
    };

    showCheckout.splice(index, 1, newObj);
  };

  useEffect(() => {
    total();
    setShowCheckout([...showCheckout, ...checkout]);
  }, [checkout.length]);

  const goToProductDetails = (product:Product) => {
    dispatch(setDetailProduct(product));
    dispatch(setPath('product_details'));
  };

  return (
    <div className="cart">
      <div className="cart__path_container">
        <img className="cart__left_img" src="./images/left.svg" alt="" />
        <Link
          to="/"
          className="cart__link"
          onClick={() => dispatch(setPath('home'))}
        >
          Back
        </Link>
      </div>
      <p className="cart__title">Cart</p>
      <div className="cart__container">
        <div className="cart__left_side">
          {
            showCheckout.map(item => (
              <div key={item.id} className="cart__product">
                <div className="cart__about_prod">
                  <button
                    type="button"
                    onClick={() => dispatch(delCheckout(item))}
                    className="cart__button_close"
                  >
                    <img
                      className="cart__prod_close"
                      src="./images/Close.svg"
                      alt=""
                    />
                  </button>
                  <Link
                    key={item.id}
                    onClick={() => {
                      goToProductDetails(item);
                      goToTop();
                    }}
                    to="product_details"
                  >
                    <img
                      className="cart__prod_img"
                      src={item.imageUrl}
                      alt=""
                    />
                  </Link>
                  <p>{item.name}</p>
                </div>
                <div className="cart__butt_prod">
                  <button
                    className="cart__minus"
                    type="button"
                    onClick={() => {
                      if (item.count > 1) {
                        minus(item);
                      }
                    }}
                  >
                    <p className="cart__minusimg" />
                  </button>
                  <p>{item.count}</p>
                  <button
                    className="cart__plus"
                    type="button"
                    onClick={() => plus(item)}
                  >
                    +
                  </button>
                  <p className="cart__price">{`$${item.price}`}</p>
                </div>
              </div>
            ))
          }
          {
            checkout.length === 0 && (
              <p className="noProduct">No Products</p>
            )
          }
        </div>
        <div className="cart__right_side">
          <p className="cart__total_price">{`$${totalPrice}`}</p>
          <p className="cart__total_items">{`Total for ${checkout.length} items`}</p>
          <button className="cart__button" type="button">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};
