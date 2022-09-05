const API = 'https://mate-academy.github.io/react_phone-catalog/api/products';

export const getData = async () => {
  const response = await fetch(`${API}.json`);

  return response.json();
};

export const getAllProductInfo = async (name:string) => {
  const response = await fetch(`${API}/${name}.json`);

  return response.json();
};
