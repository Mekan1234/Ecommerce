import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./Blog.module.css";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import moment from "moment";
const Blog = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog?.blog);
  useEffect(() => {
    getBlogs();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
      <BreadCrumb title="Blogs" />
      <div className={styles.blogWrapper}>
        <div className={styles.container}>
          <div className={styles.blogBody}>
            <div className={styles.blogSidebar}>
              <div className={styles.filterCard}>
                <h3 className={styles.filterTitle}>Find By Categories</h3>
                <div>
                  <ul>
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.blogs}>
              <div className={styles.blogCards}>
                {blogState &&
                  blogState.map((item, index) => {
                    return (
                      <BlogCard
                        key={index}
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images[0]?.URL}
                        date={moment(item?.createdAt).format(
                          "MMMM Do YYYY, h:mm a"
                        )}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
