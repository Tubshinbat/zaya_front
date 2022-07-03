import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Link from "next/link";
import Pagination from "react-js-pagination";

import base from "lib/base";
import { getInfo } from "lib/webinfo";
import { getGroups } from "lib/course";
import Header from "components/Header";
import OnlineCouseSide from "components/Sides/OnlineCouseSide";

import css from "styles/product.module.css";
import { useProducts } from "hooks/use-product";
import { useGroups } from "hooks/use-course";
import Footer from "components/Footer";

export default ({ info, groups: resGroup }) => {
  const { query, asPath } = useRouter();
  const router = useRouter();
  const [list, setList] = useState("grip");

  //-- PAGINATION
  const [activePage, setActivePage] = useState(parseInt(query.page) || 1);
  const [limit, setLimit] = useState({});
  const [total, setTotal] = useState();

  //

  const { groups, pagination } = useGroups(
    `sort=${query.sort}&page=${query.page}`,
    resGroup
  );

  useEffect(() => {
    if (pagination) {
      setTotal(pagination.total);
      setLimit(pagination.limit);
    }
  }, [pagination]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 0);
    setActivePage(pageNumber);
    router.replace({
      pathname: router.pathname,
      query: { ...query, page: pageNumber },
    });
  };

  const handleSort = (event) => {
    Router.replace({
      pathname: router.pathname,
      query: { ...query, sort: event.target.value },
    });
  };

  const handleList = () => {
    setList((bl) => {
      if (bl === "list") return "grip";
      else return "list";
    });
  };

  return (
    <Fragment>
      <Head>
        <title>Онлайн сургалт | {info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={`Онлайн сургалт  | ${info.name}`} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>

      <Header page={true} absolute={false} text="Онлайн сургалт " />

      <section className="pagesections">
        <div className="container">
          <div className="row ">
            <div className="col-lg-3">
              <OnlineCouseSide />
            </div>
            <div className="col-lg-9">
              <div className={css.ProductHeader}>
                <span> эрэмбэлэх </span>
                <select className="sort" onChange={handleSort}>
                  <option value="new">Шинэ эхэндээ</option>
                  <option value="old">Хуучин эхэндээ</option>
                </select>
              </div>
              <div
                className={`row productsGrip `}
                style={{ display: list === "grip" ? "flex" : "none" }}
              >
                {groups &&
                  groups.map((course, index) => (
                    <div className="col-md-4">
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
                    </div>
                  ))}

                {groups && groups.length < 1 && (
                  <div className={`notFound`}>
                    {/* <img src="/images/notfound.png" /> */}
                    <p> "Илэрц олдсонгүй" </p>
                  </div>
                )}
                {total && (
                  <div className={`pagination`}>
                    <Pagination
                      activePage={parseInt(query.page) || 1}
                      itemClass={`page-item`}
                      linkClass={"page-link"}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange.bind()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { info } = await getInfo();
  const { groups } = await getGroups();

  return {
    props: {
      info,
      groups,
    },
    revalidate: 40,
  };
};
