import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./CompareProduct.module.css";
import Color from "../../components/Color/Color";
import cross from "../../images/cross.svg";
import watch from "../../images/watch.jpg";

const CompareProduct = () => {
  return (
    <>
      <BreadCrumb title="Compare Products" />
      <div className={styles.compareWrapper}>
        <div className={styles.container}>
          <div className={styles.compareProductsBody}>
            <div className={styles.compareProductCard}>
              <img src={cross} alt="cross" className={styles.crossImage} />
              <div className={styles.compareProductCardImage}>
                <img src={watch} alt="watch" className="img-fluid w-100" />
              </div>
              <div className={styles.compareProductDetails}>
                <h5 className={styles.title}>
                  Honor T1 7.0 1GB RAM 8GB ROM 7 Inch Width Wi-Fi+3G Tablet
                </h5>
                <h6 className={styles.price}>$ 100</h6>
                <div>
                  <div className={styles.productDetail}>
                    <h5>Brand:</h5>
                    <p>Havels</p>
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Type:</h5>
                    <p>Watch</p>
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Availability:</h5>
                    <p>In Stock</p>
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Color:</h5>
                    <Color />
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Size:</h5>
                    <div className={styles.productSizes}>
                      <span className={styles.productSize}>S</span>
                      <span className={styles.productSize}>M</span>
                      <span className={styles.productSize}>L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.compareProductCard}>
              <img src={cross} alt="cross" className={styles.crossImage} />
              <div className={styles.compareProductCardImage}>
                <img src={watch} alt="watch" className="img-fluid w-100" />
              </div>
              <div className={styles.compareProductDetails}>
                <h5 className={styles.title}>
                  Honor T1 7.0 1GB RAM 8GB ROM 7 Inch Width Wi-Fi+3G Tablet
                </h5>
                <h6 className={styles.price}>$ 100</h6>
                <div>
                  <div className={styles.productDetail}>
                    <h5>Brand:</h5>
                    <p>Havels</p>
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Type:</h5>
                    <p>Watch</p>
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Availability:</h5>
                    <p>In Stock</p>
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Color:</h5>
                    <Color />
                  </div>
                  <div className={styles.productDetail}>
                    <h5>Size:</h5>
                    <div className={styles.productSizes}>
                      <span className={styles.productSize}>S</span>
                      <span className={styles.productSize}>M</span>
                      <span className={styles.productSize}>L</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
