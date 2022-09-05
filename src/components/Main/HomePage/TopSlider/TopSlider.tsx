import { ActionKind, usePony } from 'pony-props';
import React from 'react';
import './TopSlider.scss';

export const TopSlider:React.FC = () => {
  const {
    getSectionProps,
    getHeadingProps,
    getCarouselWrapperProps,
    getCarouselProps,
    getButtonProps,
    getCarouselItemProps,
    getAnnouncerProps,
  } = usePony({ numItems: 3 });

  return (
    <section className="top_slider">
      <div className="top_slider__container" {...getSectionProps()}>
        <h1 {...getHeadingProps()}>{' '}</h1>
        <button
          type="button"
          className="top_slider__button_left"
          {...getButtonProps(ActionKind.Previous)}
        >
          <img src="./images/left.svg" alt="" />
        </button>
        <div {...getCarouselWrapperProps()}>
          <ul {...getCarouselProps()}>
            <li className="top_slider__list" {...getCarouselItemProps(0)}>
              <img
                className="top_slider__image"
                src="./images/Banner.svg"
                alt=""
              />
            </li>
            <li className="top_slider__list" {...getCarouselItemProps(1)}>
              <img
                className="top_slider__image"
                src="./images/1040896-iphone12.webp"
                alt=""
              />
            </li>
            <li className="top_slider__list" {...getCarouselItemProps(2)}>
              <img
                className="top_slider__image"
                src="./images/165883402851674_P8741695.png"
                alt=""
              />
            </li>
          </ul>
        </div>
        <button
          className="top_slider__button_right"
          type="button"
          {...getButtonProps(ActionKind.Next)}
        >
          <img src="./images/right.svg" alt="" />
        </button>
        <div {...getAnnouncerProps()}>
          0
        </div>
      </div>
    </section>
  );
};
