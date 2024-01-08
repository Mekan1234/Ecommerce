import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../../images/compare.svg";
import heart from "../../images/heart.svg";
import person from "../../images/person.svg";
import cart from "../../images/cart.svg";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
// ES2015

import { useDispatch, useSelector } from "react-redux";
import { getAProduct } from "../../features/products/productSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [visible, setVisible] = useState(false);
  const [paginate, setPaginate] = useState(true);

  const [total, setTotal] = useState(null);
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < userCartState?.length; i++) {
      console.log({ first: sum });
      sum =
        sum +
        Number(userCartState[i].quantity) * Number(userCartState[i].price);
      console.log({ second: sum });
      setTotal(sum);
    }
  }, [userCartState]);
  useEffect(() => {
    let data = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      data.push({ id: i, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className={styles.headerWrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.headerRow}>
            <div className={styles.headerCol2}>
              <p className={styles.headertext}>
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className={styles.headerCol6}>
              <p className={styles.headertext}>
                Hotline: <a href="tel: +993 61 569877">+993 61 569877</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className={styles.headerWrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.headerRow2}>
            <div className={styles.headerCol2}>
              <h2>
                <Link className={styles.devCorner}>Ecommerce</Link>
              </h2>
            </div>
            <div className={styles.headerCol2}>
              <div className={styles.headerInput}>
                <Typeahead
                  id="pagination-example"
                  className={styles.formControl}
                  onPaginate={() => console.log("Results paginated")}
                  options={productOpt}
                  paginate={paginate}
                  minLength={2}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  placeholder="Search for products here..."
                  labelKey={"name"}
                />
                <span className={styles.inputGroupText} id="basic-addon2">
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className={styles.headerCol2}>
              {/* <div>
                <Link to="/compare-product" className={styles.headerService}>
                  <img src={compare} alt="compare" />
                  <p>
                    Compare <br /> Products
                  </p>
                </Link>
              </div> */}
              <div>
                <Link to="/wishlist" className={styles.headerService}>
                  <img src={heart} />
                  <p>
                    Favourite <br /> wishlist
                  </p>
                </Link>
              </div>
              <div>
                <Link
                  to={authState?.user === null ? "/login" : "/my-profile"}
                  className={styles.headerService}
                >
                  <img src={person} />
                  {authState?.user === null ? (
                    <p>
                      Log in <br /> My Account
                    </p>
                  ) : (
                    <p>
                      Welcome <br />
                      {authState?.user?.firstname}
                    </p>
                  )}
                </Link>
              </div>
              <div>
                <Link to="/cart" className={styles.headerService}>
                  <img src={cart} />
                  <div className={styles.productCount}>
                    <span>
                      {userCartState?.length ? userCartState?.length : 0}
                    </span>
                    <p>$ {total ? total : 0}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className={styles.headerMenu}>
        <div className={styles.headerContainer}>
          <div className={styles.headerMenuRow}>
            <div className={styles.headerMenuElement}>
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownButton}
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  <div className={styles.buttonName}>
                    <img src="images/menu.svg" alt="" />
                    <span>Shop Categories</span>
                  </div>
                  <svg
                    className="svggg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0002 13.8763L4.26367 8.13977L5.73681 6.66663L10.0002 10.9301L14.2637 6.66663L15.7368 8.13977L10.0002 13.8763Z"
                      fill="#fff"
                    />
                  </svg>
                </button>
                <ul
                  className={
                    visible
                      ? styles.dropdownMenu
                      : `${styles.dropdownMenu} ${styles.displayNone}`
                  }
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className={styles.dropdownItem} href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={styles.dropdownItem} href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={styles.dropdownItem} href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.headerMenuLinks}>
              <NavLink to="/" className={styles.headerMenuLink}>
                Home
              </NavLink>
              <NavLink to="/product" className={styles.headerMenuLink}>
                Our Store
              </NavLink>
              <NavLink to="/my-orders" className={styles.headerMenuLink}>
                My Orders
              </NavLink>
              <NavLink to="/blogs" className={styles.headerMenuLink}>
                Blogs
              </NavLink>
              <NavLink to="/contact" className={styles.headerMenuLink}>
                Contact
              </NavLink>
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
