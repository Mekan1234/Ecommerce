import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./Wishlist.module.css";
import cross from "../../images/cross.svg";
import watch from "../../images/watch.jpg";
import { getUserProductWishlist } from "../../features/user/userSlice";
import { addToWishlist } from "../../features/products/productSlice";
const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, []);
  const wishlistState = useSelector((state) => state.auth.wishlist?.wishlist);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <BreadCrumb title="Wishlist" />
      <div className={styles.wishlistWrapper}>
        <div className={styles.container}>
          <div className={styles.wishlistBody}>
            {wishlistState && wishlistState.length !== 0 ? (
              wishlistState.map((item, index) => {
                return (
                  <div className={styles.wishlistCard} key={index}>
                    <img
                      onClick={() => removeFromWishlist(item?._id)}
                      src={cross}
                      alt="cross"
                      className={styles.crossImage}
                    />
                    <div className={styles.wishlistCardImage}>
                      <img
                        src={
                          item?.images[0]?.URL
                            ? item?.images[0]?.URL
                            : "images/watch.jpg"
                        }
                        alt="watch"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className={styles.wishlistDetails}>
                      <h5 className={styles.title}>{item?.title}</h5>
                      <h6 className={styles.price}>$ {item?.price}</h6>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noData}>No Data</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
