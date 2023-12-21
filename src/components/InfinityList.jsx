import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import ProductCard from './ProductCard'

const InfinityList = props => {
    const {products} = props

    const listRef = useRef(null)

    return (
        products ?
        <div ref={listRef}>
            <Grid
                col={5}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                   products.map((item) => (
                        <ProductCard
                            key={item.div}
                            item={item}
                        />
                    ))
                }
            </Grid>
        </div>
        : <div>loading</div>
    )
}

InfinityList.propTypes = {
    products: PropTypes.array.isRequired
}

PropTypes.default = {
    products: []
}
export default InfinityList
