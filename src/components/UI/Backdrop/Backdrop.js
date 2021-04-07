import React from "react";
import PropTypes from "prop-types";
import styles from "./Backdrop.module.css";

const Backdrop = (props) =>
  props.show ? (
    <div className={styles.Backdrop} onClick={props.clicked}>
      Backdrop Component
    </div>
  ) : null;

export default Backdrop;
