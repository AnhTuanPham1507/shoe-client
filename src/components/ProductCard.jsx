import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import numberWithCommas from '../utils/numberWithCommas';
import { useDispatch } from 'react-redux';
import { set } from '../redux/product-modal/productModalSlice';

const ProductCard = props => {
    const {item} = props
    const dispatch = useDispatch()

    return (
        item ?
        <div 
            className="product-card"
        >
            <Link to={`/san-pham/${item.slug}`}>
                <div className="product-card__image">
                    <img width={200} height={200} src={item.images[0]?.values[0].path} alt={item.name} />
                </div>
                <h3 className="product-card__name">{item.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(item.details[0]?.price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(item.details[0]?.price)}</del>
                    </span>
                </div>

            </Link>
            <div className="product-card__btn">
                <div className="product-card__btn-left">
                    <p>10% giảm</p>
                </div>
                <div className='product-card__btn-right'>
                    {/* <icon 
                        className="bx bx-show bx-sm"
                    /> */}
                    <icon
                        className="bx bx-show bx-sm"
                        onClick={() => dispatch(set(item.slug))}
                        />
                </div>
            </div>
        </div>
        : <div>loading</div>
    )
}

ProductCard.propTypes = {
    item: PropTypes.object,
}

export default ProductCard
