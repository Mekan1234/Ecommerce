import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./SingleBlog.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowLeft } from "react-icons/hi";
import blog1 from "../../images/blog-1.jpg";
import { getABlog } from "../../features/blogs/blogSlice";
const SingleBlog = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getBlogId = location.pathname.split("/")[2];
  const blogState = useSelector((state) => state.blog?.singleBlog);
  useEffect(() => {
    dispatch(getABlog(getBlogId));
  }, []);
  return (
    <>
      <BreadCrumb title={blogState?.title} />
      <div className={styles.blogWrapper}>
        <div className={styles.container}>
          <div className={styles.singleBlogCard}>
            <Link to="/blogs" className={styles.goBack}>
              <HiOutlineArrowLeft />
              Go Back to Blogs
            </Link>
            <h3 className={styles.title}>{blogState?.title}</h3>
            <img
              src={
                blogState?.images[0]?.URL ? blogState?.images[0]?.URL : blog1
              }
              alt="blog"
            />
            <p
              dangerouslySetInnerHTML={{
                __html: blogState?.description,
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
