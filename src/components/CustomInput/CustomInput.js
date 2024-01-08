import React from "react";

const CustomInput = (props) => {
  const {
    type,
    placeholder,
    className,
    name,
    value,
    onChange,
    onBlur,
    disabled,
  } = props;
  return (
    <>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`form-control ${className}`}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default CustomInput;
