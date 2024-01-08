import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import ReactStars from "react-stars";
import watch from "../../images/watch.jpg";
import wish from "../../images/wish.svg";
import view from "../../images/view.svg";
import addCart from "../../images/add-cart.svg";
import compare from "../../images/prodcompare.svg";
import watch1 from "../../images/watch-1.png";
import { addToWishlist } from "../../features/products/productSlice";
import SpecialProduct from "../../components/SpecialProduct/SpecialProduct";
import mainBanner1 from "../../images/main-banner-1.jpg";
import cartBanner01 from "../../images/catbanner-01.jpg";
import cartBanner02 from "../../images/catbanner-02.jpg";
import cartBanner03 from "../../images/catbanner-03.jpg";
import cartBanner04 from "../../images/catbanner-04.jpg";
import camera from "../../images/camera.jpg";
import headphone from "../../images/headphone.jpg";
import famous001 from "../../images/famous-001.png";
import famous2 from "../../images/famous-2.jpg";
import famous3 from "../../images/famous-3.png";
import famous4 from "../../images/famous-4.webp";
import brand01 from "../../images/brand-01.png";
import brand02 from "../../images/brand-02.png";
import brand03 from "../../images/brand-03.png";
import brand04 from "../../images/brand-04.png";
import brand05 from "../../images/brand-05.png";
import brand06 from "../../images/brand-06.png";
import brand07 from "../../images/brand-07.png";
import brand08 from "../../images/brand-08.png";
import tv from "../../images/tv.jpg";
import { services } from "../../utils/Data";
import Container from "../../components/Container/Container";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../features/blogs/blogSlice";
import { getAllProducts } from "../../features/products/productSlice";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const addToWishlistToProduct = (id) => {
    dispatch(addToWishlist(id));
  };
  const blogState = useSelector((state) => state.blog?.blog);
  const productState = useSelector((state) => state.product?.product);
  console.log(productState);
  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  const getProducts = () => {
    dispatch(getAllProducts());
  };
  return (
    <>
      <Container class1={styles.homeWrapper}>
        <div className={styles.homeBannerRow}>
          <div className={styles.homeBannerBigColumn}>
            <div className={styles.mainBanner}>
              <img src={mainBanner1} alt="main-banner" />
              <div className={styles.mainBannerContent}>
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>Ipad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo</p>
                <Link className={styles.button}>BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className={styles.homeBannerSmallColumn}>
            <div className={styles.bannerWrapper}>
              <div className={styles.smallBanner}>
                <img src={cartBanner01} alt="cart-banner" />
                <div className={styles.smallBannerContent}>
                  <h4>BEST SALE</h4>
                  <h5>Laptops Max</h5>
                  <p>
                    From $1699.00 or <br /> $64.62/mo
                  </p>
                </div>
              </div>
              <div className={styles.smallBanner}>
                <img src={cartBanner02} alt="cart-banner" />
                <div className={styles.smallBannerContent}>
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy Ipad Air</h5>
                  <p>
                    From $599.00 or <br /> $49.91/mo. for 12mo. *
                  </p>
                </div>
              </div>
              <div className={styles.smallBanner}>
                <img src={cartBanner03} alt="cart-banner" />
                <div className={styles.smallBannerContent}>
                  <h4>15% OFF</h4>
                  <h5>Ipad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo</p>
                </div>
              </div>
              <div className={styles.smallBanner}>
                <img src={cartBanner04} alt="cart-banner" />
                <div className={styles.smallBannerContent}>
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>Ipad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1={styles.homeWrapper2}>
        <div className={styles.services}>
          {services?.map((i, j) => {
            return (
              <div className={styles.servicesBody} key={j}>
                <img src={i.image} alt="services" />
                <div>
                  <h6>{i.title}</h6>
                  <p>{i.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      {/* <Container class1={styles.homeWrapper2}>
        <div className={styles.categories}>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Cameras</h6>
              <p>10 Items</p>
            </div>
            <img src={camera} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Music & Gaming</h6>
              <p>10 Items</p>
            </div>
            <img src={camera} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Smart TV</h6>
              <p>10 Items</p>
            </div>
            <img src={tv} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Smart Watches</h6>
              <p>10 Items</p>
            </div>
            <img src={headphone} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Cameras</h6>
              <p>10 Items</p>
            </div>
            <img src={camera} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Music & Gaming</h6>
              <p>10 Items</p>
            </div>
            <img src={camera} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Smart TV</h6>
              <p>10 Items</p>
            </div>
            <img src={tv} alt="camera" />
          </div>
          <div className={styles.categoriesItem}>
            <div>
              <h6>Smart Watches</h6>
              <p>10 Items</p>
            </div>
            <img src={headphone} alt="camera" />
          </div>
        </div>
      </Container> */}

      <Container class1={styles.homeWrapper2}>
        <h3 className={styles.sectionHeader}>Featured Collection</h3>
        <div className={styles.blogs}>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "featured") {
                return (
                  <div key={index} className={styles.productCard}>
                    <div className={styles.wishListIcon}>
                      <button
                        className={styles.linkButton}
                        onClick={(e) => addToWishlistToProduct(item?._id)}
                      >
                        <img src={wish} alt="wishlist" />
                      </button>
                    </div>
                    <div className={styles.productImage}>
                      <img src={item?.images[0]?.URL} alt="productImage" />
                      <img src={watch1} alt="productImage" />
                    </div>
                    <div className={styles.blogContent}>
                      <h6 className={styles.brand}>{item?.brand}</h6>
                      <h5 className={styles.title}>{item?.title}</h5>
                      <div className={styles.productRatings}>
                        <ReactStars
                          count={5}
                          size={24}
                          edit={false}
                          value={item?.totalrating.toString()}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                          __html: item?.description,
                        }}
                      ></p>
                      <p className={styles.price}>$ {item?.price}</p>
                    </div>
                    <div className={styles.actionBar}>
                      <div className={styles.actionColumn}>
                        {/* <button className={styles.linkButton}>
                          <img src={compare} alt="compare" />
                        </button> */}
                        <button className={styles.linkButton}>
                          <img
                            onClick={() => navigate("/product/" + item?._id)}
                            src={view}
                            alt="view"
                          />
                        </button>
                        {/* <button className={styles.linkButton}>
                          <img src={addCart} alt="add-cart" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1={styles.homeWrapper2}>
        <div className={styles.famousRow}>
          <div className={`${styles.famousCard} ${styles.dark}`}>
            <img src={famous001} className="img-fluid" alt="" />
            <div className={styles.famousContent}>
              <h5>Big Screen</h5>
              <h6>Smart Watch Series 7</h6>
              <p>From $399 or $16.62/mo. for 24 mo *</p>
            </div>
          </div>
          <div className={styles.famousCard}>
            <img src={famous2} className="img-fluid" alt="" />
            <div className={styles.famousContent}>
              <h5>Studio Display</h5>
              <h6>600 nits of brightness</h6>
              <p>27-inc 5K Retina display</p>
            </div>
          </div>
          <div className={styles.famousCard}>
            <img src={famous3} className="img-fluid" alt="" />
            <div className={styles.famousContent}>
              <h5>SMARTPHONES</h5>
              <h6>Smartphone 15 pro.</h6>
              <p>
                Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote *
              </p>
            </div>
          </div>
          <div className={styles.famousCard}>
            <img src={famous4} className="img-fluid" alt="" />
            <div className={styles.famousContent}>
              <h5>Home Speakers</h5>
              <h6>Room-filling sound</h6>
              <p>From $699.00 or $116.58/mo. for 12 mo *</p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1={styles.homeWrapper2}>
        <h3 className={styles.sectionHeader}>Special Products</h3>
        <div className={styles.SpecialProducs}>
          {productState &&
            productState.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    totalRating={item?.totalrating.toString()}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1={styles.homeWrapper2}>
        <h3 className={styles.sectionHeader}>Our Popular Products</h3>
        <div className={styles.popularProductCards}>
          <div className={styles.blogs}>
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "popular") {
                  return (
                    <div key={index} className={styles.productCard}>
                      <div className={styles.wishListIcon}>
                        <button
                          className={styles.linkButton}
                          onClick={(e) => addToWishlistToProduct(item?._id)}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>
                      <div className={styles.productImage}>
                        <img src={item?.images[0]?.URL} alt="productImage" />
                        <img src={watch1} alt="productImage" />
                      </div>
                      <div className={styles.blogContent}>
                        <h6 className={styles.brand}>{item?.brand}</h6>
                        <h5 className={styles.title}>{item?.title}</h5>
                        <div className={styles.productRatings}>
                          <ReactStars
                            count={5}
                            size={24}
                            edit={false}
                            value={item?.totalrating.toString()}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p
                          className={styles.description}
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        ></p>
                        <p className={styles.price}>$ {item?.price}</p>
                      </div>
                      <div className={styles.actionBar}>
                        <div className={styles.actionColumn}>
                          {/* <button className={styles.linkButton}>
                            <img src={compare} alt="compare" />
                          </button> */}
                          <button className={styles.linkButton}>
                            <img
                              src={view}
                              onClick={() => navigate("/product/" + item?._id)}
                              alt="view"
                            />
                          </button>
                          {/* <button className={styles.linkButton}>
                            <img src={addCart} alt="add-cart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Container>
      <Container class1={styles.homeWrapper2}>
        <div className={styles.innerWrapper}>
          <div className={styles.animationElement}>
            <div>
              <img src={brand01} alt="brand" />
            </div>
            <div>
              <img src={brand02} alt="brand" />
            </div>
            <div>
              <img src={brand03} alt="brand" />
            </div>
            <div>
              <img src={brand04} alt="brand" />
            </div>
            <div>
              <img src={brand05} alt="brand" />
            </div>
            <div>
              <img src={brand06} alt="brand" />
            </div>
            <div>
              <img src={brand07} alt="brand" />
            </div>
            <div>
              <img src={brand08} alt="brand" />
            </div>
            <div>
              <img src={brand01} alt="brand" />
            </div>
            <div>
              <img src={brand02} alt="brand" />
            </div>
            <div>
              <img src={brand03} alt="brand" />
            </div>
            <div>
              <img src={brand04} alt="brand" />
            </div>
            <div>
              <img src={brand05} alt="brand" />
            </div>
            <div>
              <img src={brand06} alt="brand" />
            </div>
            <div>
              <img src={brand07} alt="brand" />
            </div>
            <div>
              <img src={brand08} alt="brand" />
            </div>
          </div>
        </div>
      </Container>
      <Container class1={styles.homeWrapper2}>
        <h3 className={styles.sectionHeader}>Our Latest Blogs</h3>
        <div className={styles.blogs}>
          {blogState &&
            blogState.map((item, index) => {
              if (index < 3) {
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
              }
            })}
        </div>
      </Container>
    </>
  );
};

export default Home;
