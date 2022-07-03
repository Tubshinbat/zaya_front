import css from "styles/page.module.css";
import { getEmployees, getPage, getPages } from "lib/page";
import { useNews } from "hooks/use-news";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import base from "lib/base";
import { useInfo } from "hooks/use-info";
import Header from "components/Header";

export default () => {
  const { news } = useNews(`limit=4&sort={ views: -1 }&star=true`);
  return (
    <div className={`${css.Side} `}>
      <div className={css.Side__title}>Бясалгал дасгал</div>

      <div className={css.Side__News}>
        {news &&
          news.map((el, index) => {
            return (
              <Link href={`/post/${el.slug}`}>
                <a className={css.Side__Newsbox} key={el._id}>
                  <div className={css.News__img}>
                    <img src={`${base.cdnUrl}/150x150/${el.pictures[0]}`} />
                  </div>
                  <div className={css.News__detials}>
                    <div className={css.News__date}>
                      <i class="fa-regular fa-clock"></i>{" "}
                      <ReactTimeAgo date={el.createAt} locale="mn-MN" />
                    </div>
                    <h4 className={css.News__title}>{el.name}</h4>
                  </div>
                </a>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
