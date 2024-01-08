import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./OurStore.module.css";
import { FaStar } from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import Color from "../../components/Color/Color";
import watch from "../../images/watch.jpg";
import gr4 from "../../images/gr4.svg";
import gr3 from "../../images/gr3.svg";
import gr2 from "../../images/gr2.svg";
import { useDispatch, useSelector } from "react-redux";
import gr from "../../images/gr.svg";
import { getAllProducts } from "../../features/products/productSlice";

const OurStore = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.product);

  const [labelActive, setLabelActive] = useState(null);
  const [data, setData] = useState();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [grid, setGrid] = useState(4);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);

  // Filter States
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  let gridClassName;
  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let i = 0; i < productState.length; i++) {
      const element = productState[i];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  };
  const gridClassNameFunction = () => {
    if (grid === 4) {
      gridClassName = styles.productsList4;
    }
    if (grid === 3) {
      gridClassName = styles.productsList3;
    }
    if (grid === 2) {
      gridClassName = styles.productsList2;
    }
    if (grid === 1) {
      gridClassName = styles.productsList1;
    }
  };
  gridClassNameFunction();

  return (
    <>
      <BreadCrumb title="Our Store" />
      <div
        className={styles.ourStoreWrapper}
        onClick={(e) => {
          if (e.target.className !== "input") {
            setLabelActive(null);
          }
        }}
      >
        <div className={styles.container}>
          <div className={styles.ourStoreBody}>
            <div className={styles.ourStoreSidebar}>
              <div className={styles.filterCard}>
                <h3 className={styles.filterTitle}>Shop By Categories</h3>
                <div>
                  <ul>
                    {categories &&
                      [...new Set(categories)]?.map((item, index) => {
                        return (
                          <li key={index} onClick={() => setCategory(item)}>
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className={styles.filterCard}>
                <h3 className={styles.filterTitle}>Filter By</h3>
                <div>
                  <h5 className={styles.subtitle}>Price</h5>
                  <div className={styles.priceInputs}>
                    <div className={styles.priceInput}>
                      <input
                        className="input"
                        type="number"
                        id="FromInput"
                        onClick={() => {
                          setLabelActive(styles.fromInput);
                        }}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label
                        htmlFor="FromInput"
                        className={
                          labelActive === styles.fromInput
                            ? `${styles.fromInput} ${styles.inputLabel}`
                            : styles.inputLabel
                        }
                      >
                        From
                      </label>
                    </div>
                    <div className={styles.priceInput}>
                      <input
                        className="input"
                        type="number"
                        id="ToInput"
                        onClick={(e) => {
                          setLabelActive(styles.toInput);
                        }}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label
                        htmlFor="ToInput"
                        className={
                          labelActive === styles.toInput
                            ? `${styles.toInput} ${styles.inputLabel}`
                            : styles.inputLabel
                        }
                      >
                        TO
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.innerCard}>
                  <h3 className={styles.subtitle}>Product Tags</h3>
                  <div className={styles.productTags}>
                    {tags &&
                      [...new Set(tags)]?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setTag(item)}
                            className={styles.tag}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
                <div className={styles.innerCard}>
                  <h3 className={styles.subtitle}>Product Brands</h3>
                  <div className={styles.productTags}>
                    {brands &&
                      [...new Set(brands)]?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            onClick={() => setBrand(item)}
                            className={styles.tag}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ourStoreBlogs}>
              <div className={styles.ourStoreBlogsHeader}>
                <div className={styles.filterSortGrid}>
                  <p>Sort By:</p>
                  <select
                    defaultValue={"manual"}
                    name=""
                    className="form-control form-select"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className={styles.pageChangers}>
                  <p className={styles.totalProducts}>21 Products</p>
                  <div className={styles.changerImages}>
                    <img src={gr4} alt="grid" onClick={() => setGrid(4)} />
                    <img src={gr3} alt="grid" onClick={() => setGrid(3)} />
                    <img src={gr2} alt="grid" onClick={() => setGrid(2)} />
                    <img src={gr} alt="grid" onClick={() => setGrid(1)} />
                  </div>
                </div>
              </div>
              <div className={gridClassName}>
                <ProductCard
                  grid={grid}
                  data={productState ? productState : []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
