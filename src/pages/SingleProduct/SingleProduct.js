import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./SingleProduct.module.css";
import { FaStar } from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import Container from "../../components/Container/Container";
import ReactStars from "react-stars";
import Color from "../../components/Color/Color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getAllProducts,
} from "../../features/products/productSlice";
import { toast } from "react-toastify";
import { addProductToCart, getUserCart } from "../../features/user/userSlice";

const SingleProduct = () => {
    const getUserFromLocalStorage = localStorage.getItem("customer")
      ? JSON.parse(localStorage.getItem("customer"))
      : null;
    const config2 = {
      headers: {
        Authorization: `Bearer ${
          getUserFromLocalStorage !== null ? getUserFromLocalStorage.token : ""
        }`,
        Accept: "application/json",
      },
    };
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [magnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [orderedProduct, setOrderedProduct] = useState(true);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAProduct(getProductId));
  }, []);

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const uploadCart = () => {
    if (color === null) {
      toast.error("Please Choose Color");
      return false;
    } else {
      dispatch(
        addProductToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
          config2: config2
        })
      );
      navigate("/cart");
    }
  };
  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      console.log(cartState[i]?.productId._id);
      if (getProductId === cartState[i]?.productId._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let i = 0; i < productsState.length; i++) {
      const element = productsState[i];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review About the Product.");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };
  return (
    <>
      {productState && (
        <div>
          <BreadCrumb title={productState?.title} />
          <div className={styles.mainProductWrapper}>
            <Container>
              <div className={styles.singleProduct}>
                <div className={styles.mainProductImages}>
                  <div className={styles.mainProductBigImage}>
                    <div
                      className={styles.mainProductImage}
                      onMouseEnter={() => setShowMagnifier(true)}
                      onMouseLeave={() => setShowMagnifier(false)}
                      onMouseMove={(e) => {
                        const { width, height, top, left } =
                          e.currentTarget.getBoundingClientRect();
                        const x = ((e.pageX + left) / width) * 100 - 29.66;
                        const y = ((e.pageY - 324) / height) * 100;
                        setPosition({ x, y });
                        setCursorPosition({ x, y });
                      }}
                    >
                      <img src={productState?.images[0]?.URL} alt="watch" />
                      {magnifier && (
                        <span
                          style={{
                            left: `${cursorPosition.x}%`,
                            top: `${cursorPosition.y}%`,
                            pointerEvents: "none",
                          }}
                          id="lens"
                          className={styles.lens}
                        ></span>
                      )}
                    </div>
                    {magnifier && (
                      <div>
                        <div
                          className={styles.magnifierImage}
                          style={{
                            backgroundImage: `url(${productState?.images[0]?.URL})`,
                            backgroundPosition: `${position.x}% ${position.y}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <div className={styles.otherProductImages}>
                    {productState?.images.map((item, index) => {
                      return (
                        <div className={styles.otherImage}>
                          <img src={item.URL} alt="watch" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.mainProductDetails}>
                  <div className={styles.detailsTitle}>
                    <h3>{productState.title}</h3>
                  </div>
                  <div className={styles.productPriceBlock}>
                    <p className={styles.productPrice}>
                      $ {productState.price}
                    </p>
                    <div className={styles.productRating}>
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          edit={false}
                          value={productState.totalrating.toString()}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className={styles.topReview}>(2 Reviews)</p>
                    </div>
                    <a href="#review">Write a Review</a>
                  </div>
                  <div className={styles.productInformation}>
                    <div className={styles.informationItem}>
                      <h3 className={styles.productHeading}>Type:</h3>
                      <p className={styles.productData}>Watch</p>
                    </div>
                    <div className={styles.informationItem}>
                      <h3 className={styles.productHeading}>Brand:</h3>
                      <p className={styles.productData}>{productState.brand}</p>
                    </div>
                    <div className={styles.informationItem}>
                      <h3 className={styles.productHeading}>Category:</h3>
                      <p className={styles.productData}>
                        {productState.category}
                      </p>
                    </div>
                    <div className={styles.informationItem}>
                      <h3 className={styles.productHeading}>Tags:</h3>
                      <p className={styles.productData}>{productState.tags}</p>
                    </div>
                    <div className={styles.informationItem}>
                      <h3 className={styles.productHeading}>Availability:</h3>
                      <p className={styles.productData}>In Stock</p>
                    </div>
                    <div className={styles.informationItem2}>
                      <h3 className={styles.productHeading}>Size:</h3>
                      <div className={styles.productSizes}>
                        <span className={styles.checked}>S</span>
                        <span className={styles.unChecked}>M</span>
                        <span className={styles.unChecked}>XL</span>
                        <span className={styles.unChecked}>XXL</span>
                      </div>
                    </div>
                    {alreadyAdded === false && (
                      <>
                        <div className={styles.informationItem2}>
                          <h3 className={styles.productHeading}>Color:</h3>
                          <p className={styles.colors}>
                            <Color
                              setColor={setColor}
                              colorData={productState?.color}
                            />
                          </p>
                        </div>
                      </>
                    )}
                    <div className={styles.informationItem3}>
                      {alreadyAdded === false && (
                        <>
                          <h3 className={styles.productHeading}>Quantity:</h3>
                          <div className={styles.quantityInput}>
                            <input
                              type="number"
                              min={1}
                              max={10}
                              placeholder="0"
                              className="form-control"
                              style={{
                                width: "70px",
                              }}
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            />
                          </div>
                        </>
                      )}
                      <div>
                        <div className={styles.buttons}>
                          <button
                            className={styles.button}
                            type="button"
                            onClick={() => {
                              alreadyAdded ? navigate("/cart") : uploadCart();
                            }}
                          >
                            {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                          </button>
                          <Link to="/signup" className={styles.signUpButton}>
                            Buy It Now
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={styles.compareAndWishlist}>
                      <div className={styles.addWishlist}>
                        <a href="#">
                          <AiOutlineHeart className={styles.icon} /> Add to
                          Wishlist
                        </a>
                      </div>
                      <div className={styles.compareProducts}>
                        <a href="#">
                          <TbGitCompare className={styles.icon} />
                          Add to compare
                        </a>
                      </div>
                    </div>
                    <div className={styles.accordingBlock}>
                      <div>
                        <h3 className={styles.productHeading}>
                          Shipping & Returns:
                        </h3>
                      </div>
                      <p className={styles.productData}>
                        Free shipping and returns available on all orders!{" "}
                        <br />
                        We ship all US domestic orders within
                        <b>5-10 business days!</b>
                      </p>
                    </div>
                    <div className={styles.accordingBlock2}>
                      <h3 className={styles.productHeading}>Product Link:</h3>
                      <a
                        href="javascript:void(0);"
                        className={styles.productLink}
                        onClick={() => {
                          copyToClipboard(window.location.href);
                        }}
                      >
                        Copy Product Link
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
          <div className={styles.descriptionWrapper}>
            <Container>
              <div className={styles.descriptionBody}>
                <h4>Description</h4>
                <p
                  className={styles.descriptionText}
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </Container>
          </div>
          <section id="review" className={styles.reviewsWrapper}>
            <Container>
              <h3 className={styles.reviewsTitle}>Reviews</h3>
              <div className={styles.reviewsBody}>
                <div className={styles.reviewsHead}>
                  <div>
                    <h4>Customer Reviews</h4>
                    <div className={styles.reviewRating}>
                      <div>
                        <ReactStars
                          count={5}
                          size={24}
                          edit={false}
                          value={productState.totalrating.toString()}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p>Based on 2 Reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <a href="" className={styles.writeReview}>
                        Write a Review
                      </a>
                    </div>
                  )}
                </div>
                <div className={styles.reviewForm}>
                  <h4>Write a Review</h4>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        console.log(e);
                        setStar(e);
                      }}
                    />
                  </div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                  <div className={styles.reviewButton}>
                    <button
                      onClick={addRatingToProduct}
                      className={styles.button}
                      type="button"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
                <div className={styles.reviews}>
                  {productState &&
                    productState?.ratings?.map((item, index) => {
                      return (
                        <div key={index} className={styles.review}>
                          <div className={styles.reviewerMan}>
                            <h6 className={styles.man}>Mekan</h6>
                            <div>
                              <ReactStars
                                count={5}
                                size={24}
                                edit={false}
                                value={item?.star}
                                activeColor="#ffd700"
                              />
                            </div>
                          </div>
                          <p>{item?.comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Container>
          </section>
          <section className={styles.mainProductWrapper}>
            <Container>
              <h3 className={styles.sectionHeader}>Our Popular Products</h3>
              <div className={styles.popularProductCards}>
                <div className={styles.stateBlogs}></div>
                <div className={styles.blogs}>
                  <ProductCard data={popularProduct} />
                </div>
              </div>
            </Container>
          </section>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
