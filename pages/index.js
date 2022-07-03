import Head from "next/head";
import { useCookies } from "react-cookie";
import { Fragment } from "react";
import base from "lib/base";

import { getInfo } from "lib/webinfo";
import Slider from "components/Slider";
import Header from "components/Header";
import HomeService from "components/HomeService";
import HomeCourse from "components/HomeCourse";
import HomeProduct from "components/HomeProduct";
import Footer from "components/Footer";

export default ({ info }) => {
  const [cookies] = useCookies();

  return (
    <Fragment>
      <Head>
        <title>{info.name}</title>
        <meta property="og:url" content={`${base.siteUrl}`} />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.siteInfo} />
      </Head>
      <div className="home">
        <Header />
        <Slider />
        <div className="blur">
          <img src="/images/uul-bg.png" />
        </div>
      </div>
      <HomeService />
      <HomeCourse />
      <HomeProduct />
      <Footer />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const { info } = await getInfo();
  return {
    props: {
      info,
    },
    revalidate: 50,
  };
};
