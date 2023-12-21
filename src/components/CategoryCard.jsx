import React from "react";
import PropTypes from "prop-types";

const CategoryCard = (props) => {
  const { item } = props;

  return item ? (
    <div className="category_product">
      <div class="category_product_item">
        <img
          className="image_category"
          src={`${item.image.path}`}
          alt={item.name}
        />
        <div class="a">{item.name}</div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

CategoryCard.propTypes = {
  item: PropTypes.object,
};

export default CategoryCard;
