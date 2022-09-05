export const getAllProductsInfo = (state:State) => state.allProductInfo;

export const getHotPriceProducts = (state:State) => {
  return state.allProductInfo.filter(item => item.discount > 0);
};

export const getNewPhones = (state: State) => {
  return state.allProductInfo.filter(item => item.age < 9);
};

export const getPhones = (state:State) => {
  return state.allProductInfo.filter(item => item.type === 'phone');
};

export const getTablets = (state:State) => {
  return state.allProductInfo.filter(item => item.type === 'tablet');
};

export const getAccessories = (state:State) => {
  return state.allProductInfo.filter(item => item.type === 'accessories');
};

export const getFavorite = (state:State) => state.favorite;

export const getCheckout = (state:State) => state.checkout;

export const getPath = (state:State) => state.path;

export const getDetailProduct = (state:State) => state.detailProduct;
