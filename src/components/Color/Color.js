import React from "react";
import styles from "./Color.module.css";

const Color = (props) => {
  const { colorData, setColor } = props;

  return (
    <>
      <ul className={styles.colors}>
        {colorData &&
          colorData.map((item, index) => {
            return (
              <li
                onClick={() => setColor(item?._id)}
                style={{ backgroundColor: item?.title }}
                key={index}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
