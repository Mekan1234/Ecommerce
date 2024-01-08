import React from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import styles from "./Contact.module.css";
import { FaHome } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";

import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createQuery } from "../../features/contact/contactSlice";

const contactSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Email should be a valid")
    .required("Email Address is Required"),
  mobile: yup.number().required("Mobile Number is Required"),
  comment: yup.string().required("Comment is Required"),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
    },
  });
  return (
    <>
      <BreadCrumb title="Contact Us" />
      <div className={styles.contactWrapper}>
        <div className={styles.container}>
          <div className={styles.contactMap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201317.74610375374!2d58.085474355675345!3d37.96336329113774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6ffe1bab3684d9%3A0x3cde013f62d3ade9!2z0JDRiNGF0LDQsdCw0LQsINCi0YPRgNC60LzQtdC90LjRgdGC0LDQvQ!5e0!3m2!1sru!2s!4v1701228711276!5m2!1sru!2s"
              width="600"
              height="450"
              className={styles.map}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles.contactElements}>
            <div className={styles.elementsColumn}>
              <h3 className={styles.contactTitle}>Contact</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className={styles.contactForm}
              >
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  <div className={styles.error}>
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className={styles.error}>
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className={styles.error}>
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div>
                  <textarea
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Comment"
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange("comment")}
                    onBlur={formik.handleBlur("comment")}
                  ></textarea>
                  <div className={styles.error}>
                    {formik.touched.comment && formik.errors.comment}
                  </div>
                </div>
                <div>
                  <button className={styles.button}>Submit</button>
                </div>
              </form>
            </div>
            <div className={styles.elementsColumn}>
              <h3 className={styles.contactTitle}>Get In Touch With Us</h3>
              <div>
                <ul>
                  <li className={styles.element}>
                    <FaHome className={styles.elementIcon} />
                    <address className={styles.elementTitle}>
                      Hno:40, Ashgabat, Parahat 4/2
                    </address>
                  </li>
                  <li className={styles.element}>
                    <BiPhoneCall className={styles.elementIcon} />
                    <a
                      href="tel: +993 61 569877"
                      className={styles.elementTitle}
                    >
                      +993 61 569877
                    </a>
                  </li>
                  <li className={styles.element}>
                    <AiOutlineMail className={styles.elementIcon} />
                    <a
                      className={styles.elementTitle}
                      href="mail to: usmanowmekan2001@gmail.com"
                    >
                      usmanowmekan2001@gmail.com
                    </a>
                  </li>
                  <li className={styles.element}>
                    <BiInfoCircle className={styles.elementIcon} />
                    <p className={styles.elementTitle}>
                      Monday - Friday 10 AM - 8 PM
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
