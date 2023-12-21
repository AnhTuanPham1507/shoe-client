import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'

const NewsCard = props => {
    const {item} = props

    return (
        item ?
        <Col lg={3} md={6} sm={6}>
            <div class="blog__item">
                <img class="img_post" src={item.image.path} alt={'tin tức'} />
                <div class="blog__item__text">
                    <span>{item.title}</span>
                    <h5>{item.content}</h5>
                    
                    <Link to={`/tin-tuc/${item._id}`}>Xem tin</Link>
                </div>
            </div>
        </Col> 
        : <div>loading</div>
    )
}

NewsCard.propTypes = {
    item: PropTypes.object,
}

export default NewsCard
