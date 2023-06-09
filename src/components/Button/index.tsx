import React, { FC } from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const Button: FC<Props> = ({
  children,
  onClick,
  buttonStyle,
  className,
  disabled,
  submit,
}) => {
  const checkButtonStyle = (btnStyle: string | null | undefined) => {
    if (btnStyle) {
      return `${styles[btnStyle]}`;
    }
  };
  return (
    <button
      type={submit ? "submit" : "button"}
      disabled={disabled ? disabled : false}
      className={`${className} ${styles["button"]} ${checkButtonStyle(
        buttonStyle
      )}`}
      onClick={onClick ? onClick : () => null}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
