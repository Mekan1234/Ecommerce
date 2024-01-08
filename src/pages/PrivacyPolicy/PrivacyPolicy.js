import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <>
      <BreadCrumb title="Privacy Policy" />
      <div className={styles.privacyWrapper}>
        <div className={styles.container}>
          <div className={styles.privacyBody}>
            <div className={styles.privacyDescription}>
              <p className={styles.title}>The Standart Lorem Ipsum Passage</p>
              <p className={styles.subtitle}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
                suscipit odit placeat nostrum fugit. Fugit itaque deserunt at,
                ut perferendis iste rem, aliquam quasi ipsa voluptate dolorem
                eius asperiores illum? Quas, asperiores illum provident totam
                quasi tenetur explicabo inventore distinctio. Delectus quibusdam
                perspiciatis quia laudantium excepturi rem labore adipisci
                maiores impedit et explicabo asperiores velit sed aliquid,
                similique animi consequuntur?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
