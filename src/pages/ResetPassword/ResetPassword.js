import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./ResetPassword.module.css";
import Container from "../../components/Container/Container";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/user/userSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is Required"),
});

const ResetPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  console.log(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token: getToken, password: values.password }));

      navigate("/login");
    },
  });
  return (
    <>
      <BreadCrumb title="Reset Password" />
      <Container class1={styles.loginWrapper}>
        <div className={styles.authCard}>
          <h3>Reset Password</h3>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className={styles.authForm}
          >
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
                <button className={styles.button}>Ok</button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
