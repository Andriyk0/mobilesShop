import React from 'react';
import './HomePage.scss';
import { HotPrice } from './HotPrice';
import { NewMobile } from './NewMobile';
import { ProdByCategories } from './ProdByCategories';
import { TopSlider } from './TopSlider';

export const HomePage:React.FC = () => {
  return (
    <div className="home">
      <TopSlider />
      <HotPrice />
      <ProdByCategories />
      <NewMobile />
    </div>
  );
};
