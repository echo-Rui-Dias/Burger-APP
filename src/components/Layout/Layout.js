import React from "react";
import styles from "./Layout.module.css";

import Aux from "../../hoc/ReactAux";

const Layout = (props) => (
  <Aux>
    <div className={styles.Layout}>Toolbar, SideDrawer, Backdrop</div>
    <main className={styles.Container}>{props.children}</main>
  </Aux>
);

export default Layout;
