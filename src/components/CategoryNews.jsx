import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'




const CategoryCard = props => {
    const {item} = props

    return (
        item ?
        <div className="category_product">
            <Link to={`/news/${item._id}`}>
                <div class="category_product_item">
                    <img className='image_category' src={`${process.env.REACT_APP_IMAGEURL}${item.image}`} alt={item.image} />
                    <p>
                    {item.name}
                    </p>
                </div>
            </Link>
            
        </div>
        : <div>loading</div>
    )
}

CategoryCard.propTypes = {
    item: PropTypes.object,
}

export default CategoryCard
