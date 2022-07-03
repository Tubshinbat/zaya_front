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
import { useService } from "hooks/use-service";

const HomeService = ({ page, text }) => {
  //FUNCTION
  const [singleService, setSingleService] = useState({});
  const { services } = useService(`limit=5`);

  useEffect(() => {
    if (services.length > 0) {
      setSingleService(() => services[0]);
    }
  }, [services]);

  const changeService = (index) => {
    setSingleService(() => services[index]);
  };

  return (
    <>
      <section className="homeService">
        <div className="myContainer">
          <div className="row">
            <div
              className="col-lg-6 col-md-12 col-sm-12 wow animate__animated animate__fadeInDown"
              data-wow-delay="0.4s"
            >
              {singleService && (
                <div className="serviceDetials">
                  <div className="serviceDetialsImg">
                    {singleService.pictures && (
                      <img
                        src={`${base.cdnUrl}/${singleService.pictures[0]}`}
                      />
                    )}
                  </div>
                  <div className="serviceDetail">
                    <p>{singleService.shortDetails}</p>
                    <a href={`/service/${singleService._id}`}>
                      Дэлгэрэнгүй
                    </a>{" "}
                  </div>
                </div>
              )}
            </div>
            <div
              className="col-lg-6 col-md-12 col-sm-12 wow animate__animated animate__fadeInUp"
              data-wow-delay="0.8s"
            >
              <div className="serviceHeader">
                <h3 className="serviceWelcome">
                  Манай <span> үйлчилгээ </span>{" "}
                </h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it
                </p>
                <div className="textServiceList">
                  {services &&
                    services.map((service, index) => (
                      <li
                        className={
                          singleService._id === service._id && "active"
                        }
                        onClick={() => changeService(index)}
                      >
                        {service.name}
                      </li>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeService;
