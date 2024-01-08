import React from "react";
import styles from "./Container.module.css";
const Container = (props) => {
  return (
    <div className={props.class1}>
      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default Container;
