import React from "react";
import styles from './BreadCrumb.module.css'
import { Link } from "react-router-dom";
const BreadCrumb = (props) => {
  const {title} = props
  return <div className={styles.breadCrumb}>
    <div className={styles.container}>
      <div className={styles.row}>
        <p>
          <Link to='/' className={styles.link}>Home &nbsp;</Link> /{title}
        </p>
      </div>
    </div>
  </div>;
};

export default BreadCrumb;
