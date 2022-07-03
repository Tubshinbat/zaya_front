import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import base from "lib/base";
import { useCookies } from "react-cookie";

import { useMenus } from "hooks/use-links";
import { useInfo } from "hooks/use-info";

import { useUser } from "hooks/use-user";
import MobileHeader from "components/Mobile/MobileHeader";
import UserContext from "context/UserContext";

const Header = ({ page, text, absolute = true }) => {
  const [dataMenus, setDataMenus] = useState([]);
  const { info } = useInfo();
  const { menus } = useMenus();
  const router = useRouter();
  const [type, setType] = useState("products");
  const [searchText, setSearchText] = useState("");
  const [cookies] = useCookies(["autobiztoken"]);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    if (menus) {
      setDataMenus(menus.data);
    }
  }, [menus]);

  useEffect(() => {
    window.onscroll = () => {
      let header = document.querySelector(".mainHeader");
      let headerBottom = document.querySelector(".headerBottom");
      let sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add(`headerSticky`);
        headerBottom.classList.add("sticky");
      } else {
        header.classList.remove(`headerSticky`);
        headerBottom.classList.remove("sticky");
      }
    };

    if (!userCtx.state.userData) {
      if (cookies.autobiztoken) {
        userCtx.getUser(cookies.autobiztoken);
      }
    }
  }, []);

  //FUNCTION

  const renderMenu = (categories) => {
    let myCategories = [];
    categories &&
      categories.map((el) => {
        myCategories.push(
          <li key={el._id}>
            {!el.isDirect && !el.model && (
              <Link href={`/p/${el.slug}`}>
                <a>{el.name}</a>
              </Link>
            )}
            {el.isDirect && (
              <a href={el.direct} target="_blank">
                {el.name}
              </a>
            )}
            {el.model && (
              <Link href={`/${el.model}`}>
                <a>{el.name}</a>
              </Link>
            )}
          </li>
        );
      });

    return myCategories;
  };

  return (
    <>
      <header className={`${absolute === false && "pageHeader"} mainHeader `}>
        <div className="container">
          <div className="header">
            <div className="headerLeft">
              <div className="headerLogo">
                {info.logo && (
                  <a href="/">
                    <img
                      src={`${base.cdnUrl}/${info.whiteLogo}`}
                      className="whiteLogo"
                    />

                    <img
                      src={`${base.cdnUrl}/${info.logo}`}
                      className="colorLogo"
                    />
                  </a>
                )}
              </div>
              <div className="headerMid">
                <ul className="headerMenu">{renderMenu(dataMenus)}</ul>
              </div>
            </div>
            <div className="headerButtons">
              {userCtx.state.userData ? (
                <Link href="/login">
                  <div className="headerBottom">
                    <div className="BottomIcon">
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <div className="BottomText">
                      {userCtx.state.userData.firstName
                        ? userCtx.state.userData.firstName
                        : userCtx.state.userData.email}
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div className="headerBottom">
                    <div className="BottomIcon">
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <div className="BottomText">Нэвтрэх</div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <MobileHeader page={page} text={text} />
    </>
  );
};

export default Header;
