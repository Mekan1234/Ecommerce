import React, { useEffect, useState } from "react";
import styles from "./CheckOut.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import watch from "../../images/watch.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { config } from "../../utils/axiosConfig";
import {
  createAnOrder,
  deleteUserCart,
  resetState,
} from "../../features/user/userSlice";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  state: yup.string().required("State is Required"),
  address: yup.string().required("Address Details are Required"),
  country: yup.string().required("Country is Required"),
  city: yup.string().required("City is Required"),
  pinCode: yup.string().required("Pin Code is Required"),
  other: yup.string().required("Other is Required"),
});

const CheckOut = () => {
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      state: "",
      address: "",
      country: "",
      city: "",
      pinCode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum = sum + Number(cartState[i].quantity) * cartState[i].price;
      setTotalAmount(sum);
    }
  }, [cartState]);
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
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/my-orders");
    }
  }, [authState]);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    let items = [];
    for (let i = 0; i < cartState?.length; i++) {
      items.push({
        product: cartState[i].productId._id,
        quantity: cartState[i].quantity,
        color: cartState[i].color._id,
        price: cartState[i].price,
      });
    }
    setCartProductState(items);
  }, []);
  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log(res);
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      { amount: totalAmount },
      config2
    );
    if (!result) {
      alert("Something Went Wrong");
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_p6QMI5MkJundzn", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Ecommerce.",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };
        console.log(data.razorpayPaymentId);
        const result = await axios.post(
          "http://localhost:5000/api/user/order/paymentVerification",
          data,
          config2
        );
        console.log(shippingInfo);

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: result.data,
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );
        dispatch(deleteUserCart());
        localStorage.removeItem("address");
        dispatch(resetState());
      },
      prefill: {
        name: "Ecommerce",
        email: "ecommerce@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Ecommerce Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div className={styles.checkOutWrapper}>
        <div className={styles.container}>
          <div className={styles.checkOutBody}>
            <div className={styles.leftColumn}>
              <div className={styles.websiteName}>Dev Corner</div>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Information
                  </li>
                  &nbsp;/
                  <li className="breadcrumb-item active">Shipping</li>
                  &nbsp;/
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className={styles.title}>Contact Information</h4>
              <p className={styles.userDetails}>
                Mekan (usmanowmekan2001@gmail.com)
              </p>
              <h4 className={styles.shippingAddress}>Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className={styles.checkOutForm}
              >
                <div className={styles.formSelect}>
                  <select
                    className="form-control form-select"
                    id=""
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    value={formik.values.country}
                    name="country"
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                  </select>
                  <div className={styles.error}>
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className={styles.flexGrow}>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className={styles.error}>
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className={styles.flexGrow}>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className={styles.error}>
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className={styles.w100}>
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className={styles.error}>
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className={styles.w100}>
                  <input
                    type="text"
                    placeholder="Apartment, Suite, etc"
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    value={formik.values.other}
                  />
                  <div className={styles.error}>
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>
                <div className={styles.flexGrow}>
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div className={styles.error}>
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className={styles.flexGrow}>
                  <select
                    className="form-control form-select"
                    id=""
                    name="state"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    value={formik.values.state}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Lebap">Lebap</option>
                    <option value="Ashgabat">Ashgabat</option>
                    <option value="Ahal">Ahal</option>
                  </select>
                  <div className={styles.error}>
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className={styles.flexGrow}>
                  <input
                    type="text"
                    placeholder="Zip code"
                    className="form-control"
                    name="pinCode"
                    onChange={formik.handleChange("pinCode")}
                    onBlur={formik.handleBlur("pinCode")}
                    value={formik.values.pinCode}
                  />
                  <div className={styles.error}>
                    {formik.touched.pinCode && formik.errors.pinCode}
                  </div>
                </div>
                <div className={styles.checkOutButtons}>
                  <Link to="/cart" className={styles.returnCartButton}>
                    <IoArrowBack />
                    Return to Cart
                  </Link>
                  <Link to="/cart" className={styles.button}>
                    Continue to Shipping
                  </Link>
                  <button className={styles.button} type="submit">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
            <div className={styles.rightColumn}>
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div key={index} className={styles.CartRow}>
                      <div className={styles.image}>
                        <span className={styles.circle}>{item?.quantity}</span>
                        <img src={item?.productId?.images[0]?.URL} alt="" />
                      </div>
                      <div className={styles.imageDescription}>
                        <h5 className={styles.totalPrice}>
                          {item?.productId?.title}
                        </h5>
                        <p className={styles.totalPrice}>
                          {item?.color?.title}
                        </p>
                      </div>
                      <div className={styles.cartPrice}>
                        <h5 className={styles.totalTitle}>
                          $ {item?.price * item?.quantity}
                        </h5>
                      </div>
                    </div>
                  );
                })}

              <div className={styles.row}>
                <div className={styles.description}>
                  <p className={styles.totalTitle}>Subtotal</p>
                  <p className={styles.totalPrice}>
                    $ {totalAmount ? totalAmount : "0"}
                  </p>
                </div>
                <div className={styles.description}>
                  <p className={styles.totalTitle}>Shipping</p>
                  <p className={styles.totalPrice}>$ 5</p>
                </div>
              </div>
              <div className={styles.total}>
                <h4 className={styles.totalTitle}>Total</h4>
                <h5 className={styles.totalPrice}>
                  $ {totalAmount ? totalAmount + 5 : "0"}
                </h5>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
