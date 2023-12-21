import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Checkout from "../pages/Checkout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Order from '../pages/Order';
import Contact from '../pages/Contact';
import News from '../pages/News';
import NewsDetail from '../pages/NewsDetail';
import UpdatePassword from '../pages/UpdatePassword';
import ForgotPassword from '../pages/ForgotPassword';
import UpdateUser from '../pages/UpdateUser';

const Routes = () => {
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact component={Home} />
         <Route path="/san-pham/:slug" component={Product} />
        <Route path="/san-pham" component={Catalog} />
        <Route path="/thanh-toan" component={Checkout} />
        <Route path="/dang-ky" component={Register} />
        <Route path="/dang-nhap" component={Login} />
        <Route path="/don-hang" component={Order} />
        <Route path="/lien-he" component={Contact} />
        <Route path="/tin-tuc/:id" component={NewsDetail} />
        <Route path="/tin-tuc" component={News} />
        <Route path="/cap-nhat-mat-khau" component={UpdatePassword} />
        <Route path="/quen-mat-khau" component={ForgotPassword} />
        <Route path="/cap-nhat-tai-khoan" component={UpdateUser} />
      </Switch>
    </div>
  );
};

export default Routes;
