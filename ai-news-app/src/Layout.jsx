import Navbar from "./Components/Nav_bar/Navbar.jsx";
import Page from "./Page.jsx";
import st from "./Layout.module.css";
import {Outlet, RouterProvider} from "react-router";
import {ThemeProvider} from "./Source/Filters.jsx";
import Footer from "./Components/Nav_bar/Footer.jsx";

const Layout = () => {
  return (
    <>
        <Navbar/>
        <Page>
          <div className={st.gap}></div>
          <Outlet/>
        </Page>
        <Footer/>
    </>
  );
}

export default Layout;