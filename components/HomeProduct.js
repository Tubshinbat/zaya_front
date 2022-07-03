import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import base from "lib/base";
import { useCookies } from "react-cookie";

import { useMenus } from "hooks/use-links";
import { useInfo } from "hooks/use-info";

import { useUser } from "hooks/use-user";
// import MobileHeader from "components/Mobile/MobileHeader";
import UserContext from "context/UserContext";
import { useProducts } from "hooks/use-product";

const HomeProduct = ({ page, text }) => {
  //FUNCTION

  const { products } = useProducts(`limit=10`);

  return (
    <>
      <section className="homeProduct">
        <div className="myContainer">
          <div className="sectionTitle">
            <h3> Бүтээгдэхүүнүүд </h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <div className="row">
            {products &&
              products.map((product, index) => (
                <div
                  className=" col-md-3 col-sm-4 col-md-2-5 wow animate__animated animate__fadeInDown"
                  data-wow-delay={`${index * 0.2}s`}
                >
                  <div className="productItem">
                    <Link href={`/product/${product._id}`}>
                      <div
                        className="productImage"
                        style={{
                          backgroundImage: `url(${base.cdnUrl}/${product.pictures[0]})`,
                        }}
                      ></div>
                    </Link>
                    <div className="productMore">
                      <h4> {product.name} </h4>
                      <p className="productPrice">
                        {new Intl.NumberFormat().format(product.price)}{" "}
                        {product.priceVal}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProduct;
