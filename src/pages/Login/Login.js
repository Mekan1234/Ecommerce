import React, { useEffect } from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import Container from "../../components/Container/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email should be a valid")
    .required("Email Address is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate("/");
    }
  }, [authState]);
  return (
    <>
      <BreadCrumb title="Login" />
      <Container class1={styles.loginWrapper}>
        <div className={styles.authCard}>
          <h3>Login</h3>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className={styles.authForm}
          >
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
              <Link to="/forgot-password">Forgot Password?</Link>
              <div className={styles.buttons}>
                <button className={styles.button} type="submit">
                  Login
                </button>
                <Link to="/signup" className={styles.signUpButton}>
                  SignUp
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
