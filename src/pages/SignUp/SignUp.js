import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { registerUser } from "../../features/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .email("Email should be a valid")
    .required("Email Address is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
  password: yup.string().required("Password is Required"),
});

const SignUp = () => {
  const navigate = useNavigate()
  const authState = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });
  useEffect(()=>{
    if (authState.createdUser !== null && authState.isError === false) {
      navigate('/login')
    }
  },[])
  return (
    <>
      <BreadCrumb title="Sign Up" />
      <Container class1={styles.loginWrapper}>
        <div className={styles.authCard}>
          <h3>Sign Up</h3>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className={styles.authForm}
          >
            <CustomInput
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
            />
            <div className={styles.error}>
              {formik.touched.firstname && formik.errors.firstname}
            </div>
            <CustomInput
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
            />
            <div className={styles.error}>
              {formik.touched.lastname && formik.errors.lastname}
            </div>
            <CustomInput
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <div className={styles.error}>
              {formik.touched.email && formik.errors.email}
            </div>
            <CustomInput
              type="tel"
              placeholder="Mobile Number"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
            />
            <div className={styles.error}>
              {formik.touched.mobile && formik.errors.mobile}
            </div>
            <CustomInput
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <div className={styles.error}>
              {formik.touched.password && formik.errors.password}
            </div>
            <div>
              <div className={styles.buttons}>
                <button className={styles.button}>Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
