import Link from "next/link";
import base from "lib/base";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import {
  Pagination,
  EffectFade,
  Navigation,
  Scrollbar,
  Autoplay,
} from "swiper";

import { useBanners } from "hooks/use-banner";
import { useState } from "react";

const Slider = () => {
  //FUNCTION
  const { banners } = useBanners();

  return (
    <div className="banner">
      <Swiper
        modules={[EffectFade, Pagination, Navigation, Scrollbar, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 8000,
        }}
        pagination={{ el: ".homeSlider_pagination" }}
        loop={true}
        className="homeBanner"
      >
        {banners &&
          banners.map((banner) => {
            return (
              <SwiperSlide>
                <div className="container">
                  <div className="homeSlideText">
                    <h4 className="header__title">{banner.name}</h4>
                    <p className="header__text">{banner.details}</p>
                  </div>
                </div>

                <div className="homeSlideImage">
                  <div class="canvas">
                    <div class="lights">
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                      <div class="borealis"></div>
                    </div>
                  </div>
                  <img src={`${base.cdnUrl}/${banner.picture}`} />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Slider;
