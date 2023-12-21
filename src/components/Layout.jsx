import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Routes from "../routes/Routes";
import ProductViewModal from "./ProductViewModal";

const Layout = () => {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <>
            <Header {...props} />
            <Routes />
            <Footer />
            <ProductViewModal/>

          </>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
