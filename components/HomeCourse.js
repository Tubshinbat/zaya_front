import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import base from "lib/base";
import { useCookies } from "react-cookie";

import { useMenus } from "hooks/use-links";
import { useInfo } from "hooks/use-info";

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

import { useUser } from "hooks/use-user";
// import MobileHeader from "components/Mobile/MobileHeader";
import UserContext from "context/UserContext";
import { useGroups } from "hooks/use-course";

const HomeCourse = ({ page, text }) => {
  //FUNCTION
  const [singleService, setSingleService] = useState({});
  const { courses } = useGroups(`limit=3`, []);

  return (
    <>
      <section className="homeCourse">
        <div className="container">
          <div className="sectionTitle white">
            <h3> Манай сургалтууд </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <Swiper
            modules={[Pagination, Navigation, Scrollbar, Autoplay]}
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 5000,
            }}
            breakpoints={{
              1000: {
                slidesPerView: 3,
              },
              700: {
                slidesPerView: 2,
              },
              200: {
                slidesPerView: 1,
              },
            }}
            navigation={{ prevEl: ".slider__prev", nextEl: ".slider__next" }}
            loop={true}
            className="homeCourseSlide"
          >
            {courses &&
              courses.map((course, index) => (
                <SwiperSlide>
                  <div className="courseBox">
                    <Link href={`/online/${course.slug}`}>
                      <div className="courseImg">
                        <div className="courseTeacher">
                          {course.teachers && course.teachers[0].name}
                        </div>
                        <img src={`${base.cdnUrl}/${course.pictures[0]}`} />
                      </div>
                    </Link>
                    <div className="courseTitle">
                      <h4> {course.name} </h4>
                      <div className="coursePrice">
                        {new Intl.NumberFormat().format(course.price)}{" "}
                        {course.priceVal}{" "}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            <div className="slider__nav">
              <div className="slider__prev swiper-button-prev"></div>
              <div className="slider__next swiper-button-next"></div>
            </div>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default HomeCourse;
