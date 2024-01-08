import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from "./SpecialProduct.module.css";
import ReactStars from "react-stars";
import watch from "../../images/watch.jpg";
const SpecialProduct = (props) => {
  const { title, brand, totalRating, price, sold, quantity, id } = props;
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div className={styles.specialProductCard}>
      <div>
        <img src={watch} className="img-fluid" alt="watch" />
      </div>
      <div className={styles.specialProductContent}>
        <h5 className={styles.brand}>{brand}</h5>
        <h6 className={styles.title}>{title}</h6>
        <div className={styles.productRatings}>
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={totalRating}
            activeColor="#ffd700"
          />
        </div>
        <p className={styles.price}>
          <span className={styles.redPrice}>$ {price}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* <strike>$75.00</strike> */}
        </p>
        {/* <div className={styles.discountTill}>
          <p>
            <b>5 </b>Days
          </p>
          <div className={styles.circles}>
            <span>1</span>:<span>1</span>:<span>1</span>
          </div>
        </div> */}
        <div className={styles.productCount}>
          <p>Products: {quantity}</p>
          <div className={styles.progressBar}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: (quantity / (quantity + sold)) * 100 + "%" }}
                aria-valuenow={(quantity / (quantity + sold)) * 100}
                aria-valuemin={quantity}
                aria-valuemax={quantity + sold}
              ></div>
            </div>
          </div>
        </div>
        <Link to={"/product/" + id} className={styles.button}>
          View
        </Link>
      </div>
    </div>
  );
};

export default SpecialProduct;
