/* eslint-disable no-alert */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAllProductInfo, getData } from './api/api';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AccessoriesPage } from './components/Main/AcsessoriesPage';
import { CheckoutPage } from './components/Main/CheckoutPage';
import { HomePage } from './components/Main/HomePage';
import { LikedProductPage } from './components/Main/LikedProductPage';
import { NotFoundPage } from './components/Main/NotFoundPage';
import { PhonesPage } from './components/Main/PhonesPage';
import { ProductDetailsPage } from './components/Main/ProductDetailsPage';
import { TabletsPage } from './components/Main/TabletsPage';
import { setAllProductInfo } from './store';

const App = () => {
  const dispatch = useDispatch();

  const loadAllProduckInfoFromServer = async (productArr:Product[]) => {
    const allProductInfo = await Promise.all(productArr.map(async item => {
      const response = await getAllProductInfo(item.id);
      const newProduct = {
        ...item,
        ...response,
        count: 1,
      };

      return newProduct;
    }));

    dispatch(setAllProductInfo(allProductInfo));
  };

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const response = await getData();

        await loadAllProduckInfoFromServer(response);
      } catch (error) {
        alert('Error try again');
      }
    };

    getDataFromServer();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route
          path="accessories/product_details"
          element={<Navigate to="/product_details" replace />}
        />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route
          path="checkout/product_details"
          element={<Navigate to="/product_details" replace />}
        />
        <Route path="liked_product" element={<LikedProductPage />} />
        <Route
          path="checkout/product_details"
          element={<Navigate to="/product_details" replace />}
        />
        <Route path="phones" element={<PhonesPage />} />
        <Route
          path="phones/product_details"
          element={<Navigate to="/product_details" replace />}
        />
        <Route path="product_details" element={<ProductDetailsPage />} />
        <Route
          path="product_details/product_details"
          element={<Navigate to="/product_details" replace />}
        />
        <Route
          path="product_details/phones"
          element={<Navigate to="/phones" replace />}
        />
        <Route path="tablets" element={<TabletsPage />} />
        <Route
          path="tablets/product_details"
          element={<Navigate to="/product_details" replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
