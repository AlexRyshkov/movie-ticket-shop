import { ReactNode } from "react";
import classes from "./styles.module.css";
import Header from "../Header";
import Footer from "../Footer";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className={classes.layout}>
      <div className={classes.headerContainer}>
        <Header />
      </div>
      <div className={classes.contentContainer}>{children}</div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
