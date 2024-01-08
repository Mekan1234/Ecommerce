import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./TermAndConditions.module.css";

const TermAndConditions = () => {
  return (
    <>
      <BreadCrumb title="Term And Conditions" />
      <section className={styles.termWrapper}></section>
    </>
  );
};

export default TermAndConditions;
