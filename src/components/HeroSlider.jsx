import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";

const HeroSlider = (props) => {
  const data = props.data;

  return (
    <Carousel>
      {data.map((item) => (
        <Carousel.Item id={item.id}>
          <img
            className="d-block w-100 carousel-item"
            src={item.image.path}
            alt={item.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

HeroSlider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

export default HeroSlider;
