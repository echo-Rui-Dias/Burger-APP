import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = (props) => (
  <button
    className={[styles.Button, styles[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {};

Button.defaultProps = {};

export default Button;
