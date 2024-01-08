import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import newsletter from "../../images/newsletter.png";
const Footer = () => {
  return (
    <>
      <footer className={`${styles.footer} ${styles.footerFirst}`}>
        <div className={styles.footerContainer}>
          <div className={styles.footerElements}>
            <div className={styles.footerElement}>
              <img src={newsletter} alt="" />
              <h2>Sign Up for Newsletter</h2>
            </div>
            <div className={styles.footerInputBlock}>
              <div className={styles.footerInput}>
                <input
                  type="text"
                  className={styles.formControl}
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className={styles.inputGroupText} id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerMain}>
            <div className={styles.footerMainElement}>
              <h4>Contact Us</h4>
              <div>
                <address className={styles.address}>
                  Hno : 277 Near Vill chopal, <br /> Sonipat, Haryana <br />{" "}
                  PinCode: 131103
                </address>
                <a className={styles.contact} href="tel: +99361569877">
                  +993 61569877
                </a>
                <br />
                <a
                  className={styles.contact}
                  href="mailto:usmanowmekan2001@gmail.com"
                >
                  usmanowmekan2001@gmail.com
                </a>
                <div className={styles.contactIcons}>
                  <a href="#">
                    <FaLinkedin />
                  </a>
                  <a href="#">
                    <FaInstagram />
                  </a>
                  <a href="#">
                    <FaYoutube />
                  </a>
                  <a href="#">
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.footerMainElement}>
              <h4>Information</h4>
              <div className={styles.footerLinks}>
                <Link to="/privacy-policy" className={styles.footerLink}>
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className={styles.footerLink}>
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className={styles.footerLink}>
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className={styles.footerLink}>
                  Terms & Conditions
                </Link>
                <Link className={styles.footerLink}>Blogs</Link>
              </div>
            </div>
            <div className={styles.footerMainElement}>
              <h4>Account</h4>
              <div className={styles.footerLinks}>
                <Link className={styles.footerLink}>About Us</Link>
                <Link className={styles.footerLink}>Faq</Link>
                <Link className={styles.footerLink}>Watch</Link>
              </div>
            </div>
            <div className={styles.footerMainElement}>
              <h4>Quick Links</h4>
              <div className={styles.footerLinks}>
                <Link className={styles.footerLink}>Laptops</Link>
                <Link className={styles.footerLink}>Headphones</Link>
                <Link className={styles.footerLink}>Tablets</Link>
                <Link className={styles.footerLink}>Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerNotice}>
            &copy; {new Date().getFullYear()}; Powered by Developer's Corner
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
