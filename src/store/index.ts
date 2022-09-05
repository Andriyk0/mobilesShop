/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

enum ActionType {
  SET_DATA = 'SET_DATA',
  SET_PATH = 'SET_PATH',
  SET_FAVORITE = 'SET_FAVORITE',
  DEL_FAVORITE = 'DEL_FAVORITE',
  SET_CHECKOUT = 'SET_CHECKOUT',
  DEL_CHECKOUT = 'DEL_CHECKOUT',
  DETAIL_PRODUCT = 'DETAIL_PRODUCT',
}

const initialState = {
  allProductInfo: [],
  path: 'home',
  favorite: [],
  checkout: [],
  detailProduct: {},
};

export const setAllProductInfo = createAction<Product[]>(ActionType.SET_DATA);
export const setPath = createAction<string>(ActionType.SET_PATH);
export const setFavorite = createAction<Product>(ActionType.SET_FAVORITE);
export const delFavorite = createAction<Product>(ActionType.DEL_FAVORITE);
export const setCheckout = createAction<Product>(ActionType.SET_CHECKOUT);
export const delCheckout = createAction<Product>(ActionType.DEL_CHECKOUT);
export const setDetailProduct
  = createAction<Product>(ActionType.DETAIL_PRODUCT);

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setAllProductInfo, (state, action:any) => {
    // eslint-disable-next-line no-param-reassign
    state.allProductInfo = action.payload;
  });

  builder.addCase(setPath, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.path = action.payload;
  });

  builder.addCase(setFavorite, (state:any, action:any) => {
    // eslint-disable-next-line no-param-reassign
    state.favorite = [...state.favorite, action.payload];
  });

  builder.addCase(delFavorite, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.favorite = state.favorite
      .filter((item:Product) => item.id !== action.payload.id);
  });

  builder.addCase(setCheckout, (state:any, action:any) => {
    // eslint-disable-next-line no-param-reassign
    state.checkout = [...state.checkout, action.payload];
  });

  builder.addCase(delCheckout, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.checkout = state.checkout
      .filter((item:Product) => item.id !== action.payload.id);
  });

  builder.addCase(setDetailProduct, (state, action) => {
    // eslint-disable-next-line no-param-reassign
    state.detailProduct = action.payload;
  });
});

export const store = configureStore({
  reducer,
});
