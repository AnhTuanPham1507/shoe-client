import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import ProductCard from './ProductCard'

const ListProduct = props => {
    const {products} = props

    const listRef = useRef(null)
    
   

    return (
        products ?
        <div className="wrapper">
            
                {
                   products.map((item) => (
                        <ProductCard
                            item={item}
                        />
                    ))
                }
           
        </div>
        : <div>loading</div>
    )
}

ListProduct.propTypes = {
    products: PropTypes.array.isRequired
}

PropTypes.default = {
    products: []
}
export default ListProduct
