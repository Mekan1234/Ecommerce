import React from "react";
import styles from "./BlogCard.module.css";
import { Link } from "react-router-dom";
import blog1 from "../../images/blog-1.jpg";
const BlogCard = (props) => {
  const { id, title, description, image, date } = props;
  return (
    <button className={styles.blogCard}>
      <div className={styles.cardImage}>
        <img
          src={image ? image : "images/blog-1.jpg"}
          className="img-fluid w-100"
          alt=""
        />
      </div>
      <div className={styles.blogContent}>
        <p className={styles.date}>{date}</p>
        <h5 className={styles.title}>{title}</h5>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: description.substr(0, 70) + "...",
          }}
        ></p>
        <Link to={`/blog/${id}`} className={styles.button}>
          Read More
        </Link>
      </div>
    </button>
  );
};

export default BlogCard;
