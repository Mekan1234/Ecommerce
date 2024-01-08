import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import watch from "../../images/watch.jpg";
import wish from "../../images/wish.svg";
import view from "../../images/view.svg";
import addCart from "../../images/add-cart.svg";
import compare from "../../images/prodcompare.svg";
import watch1 from "../../images/watch-1.png";
import { addToWishlist } from "../../features/products/productSlice";
const ProductCard = (props) => {
  const { grid, data } = props;
  let location = useLocation();
  const dispatch = useDispatch();
  const addToWishlistToProduct = (id) => {
    dispatch(addToWishlist(id));
  };
  let gridClassName;
  let discriptionClassName;
  const gridClassNameFunction = () => {
    if (grid === 1) {
      gridClassName = styles.productCard1;
    } else {
      gridClassName = styles.productCard;
    }
  };
  const discriptionClassNameFunction = () => {
    if (grid === 1) {
      discriptionClassName = styles.description;
    } else {
      discriptionClassName = styles.displayNone;
    }
  };
  gridClassNameFunction();
  discriptionClassNameFunction();

  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <div key={index} className={gridClassName}>
              <div className={styles.wishListIcon}>
                <button
                  className={styles.linkButton}
                  onClick={(e) => addToWishlistToProduct(item?._id)}
                >
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div className={styles.productImage}>
                <img src={item?.images[0]?.URL} alt="productImage" />
                <img src={watch1} alt="productImage" />
              </div>
              <div className={styles.blogContent}>
                <h6 className={styles.brand}>{item?.brand}</h6>
                <h5 className={styles.title}>{item?.title}</h5>
                <div className={styles.productRatings}>
                  <ReactStars
                    count={5}
                    size={24}
                    edit={false}
                    value={item?.totalrating}
                    activeColor="#ffd700"
                  />
                </div>
                <p
                  className={discriptionClassName}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className={styles.price}>$ {item?.price}</p>
              </div>
              <div className={styles.actionBar}>
                <div className={styles.actionColumn}>
                  {/* <button className={styles.linkButton}>
                    <img src={compare} alt="compare" />
                  </button> */}
                  <Link
                    to={"/product/" + item?._id}
                    className={styles.linkButton}
                  >
                    <img src={view} alt="view" />
                  </Link>
                  {/* <button className={styles.linkButton}>
                    <img src={addCart} alt="add-cart" />
                  </button> */}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
