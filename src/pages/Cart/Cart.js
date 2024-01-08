import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./Cart.module.css";
import watch from "../../images/watch.jpg";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../../features/user/userSlice";
import Container from "../../components/Container/Container";

const Cart = () => {
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
  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state.auth.cartProducts);
  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 200);
    }
  }, [productUpdateDetail]);
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < userCartState?.length; i++) {
      sum = sum + Number(userCartState[i].quantity) * userCartState[i].price;
      setTotalAmount(sum);
    }
  }, [userCartState]);
  return (
    <>
      <BreadCrumb title="Your Shopping Cart" />
      <div className={styles.cartWrapper}>
        <Container>
          <div className={styles.cartHeader}>
            <h4 className={styles.cartColumn1}>Product</h4>
            <h4 className={styles.cartColumn2}>Price</h4>
            <h4 className={styles.cartColumn3}>Quantity</h4>
            <h4 className={styles.cartColumn4}>Total</h4>
          </div>
          {userCartState &&
            userCartState?.map((item, index) => {
              return (
                <div key={index} className={styles.cartData}>
                  <div className={styles.cartColumn1}>
                    <div className={styles.cartImage}>
                      <img src={item?.productId?.images[0]?.URL} alt="" />
                    </div>
                    <div className={styles.cartDescription}>
                      <p>{item?.productId.title}</p>
                      <div className={styles.colorBlock}>
                        Color:
                        <ul className={styles.colors}>
                          <li
                            style={{ backgroundColor: item?.color.title }}
                          ></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cartColumn2}>
                    <h5 className={styles.productPrice}>$ {item?.price}</h5>
                  </div>
                  <div className={styles.cartColumn3}>
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        name={"quantity" + item?._id}
                        min={1}
                        max={10}
                        id={"cart" + item?._id}
                        value={item?.quantity}
                        onChange={(e) =>
                          setProductUpdateDetail({
                            cartItemId: item?._id,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <MdDelete
                        onClick={() => deleteACartProduct(item?._id)}
                        className={styles.deleteIcon}
                      />
                    </div>
                  </div>
                  <div className={styles.cartColumn4}>
                    <h5 className={styles.productPrice}>
                      $ {item?.price * item?.quantity}
                    </h5>
                  </div>
                </div>
              );
            })}
          <div className={styles.shoppingButton}>
            <Link to="/product" className={styles.button}>
              Continue To Shopping
            </Link>
            {totalAmount !== null && totalAmount !== 0 && (
              <div className={styles.checkOutButton}>
                <h4>SubTotal: $ {totalAmount}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className={styles.button}>
                  CheckOut
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Cart;
