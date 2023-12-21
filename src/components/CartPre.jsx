import React from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

const CartPre = (props) => {
  const { item } = props;

  return item ? (
    <Link to={`/san-pham/${item.productSlug}`}>
      <div className="cartpre__item">
        <div className="cartpre__item__image">
          <img src={item.image.path} alt={item.image.name} />
        </div>
        <div className="cartpre__item__info">
          <div className="cartpre__item__info__name">{`${item.productName}`}</div>
          <div className="cartpre__item__info__quantity">
            Số lượng: {item.quantity}
          </div>
          <div className="cartpre__item__info__quantity">
            Giá: {numberWithCommas(item.price)}
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <div>loding</div>
  );
};

CartPre.propTypes = {
  item: PropTypes.object,
};

export default CartPre;
