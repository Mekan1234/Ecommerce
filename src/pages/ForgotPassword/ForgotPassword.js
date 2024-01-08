import React from "react";
import styles from "./ForgotPassword.module.css";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/CustomInput/CustomInput";
import Container from "../../components/Container/Container";
import { forgotPasswordToken } from "../../features/user/userSlice";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Email should be a valid")
    .required("Email Address is Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });
  return (
    <>
      <BreadCrumb title="Forgot Password" />
      <Container class1={styles.loginWrapper}>
        <div className={styles.authCard}>
          <h3>Reset Your Password</h3>
          <p className={styles.text}>
            We will send you an email to reset your password
          </p>
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
            <div>
              <div className={styles.buttons}>
                <button className={styles.button} type="submit">
                  Submit
                </button>
                <Link to="/login">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
