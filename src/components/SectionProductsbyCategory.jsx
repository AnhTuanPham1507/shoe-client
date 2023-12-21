import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { productAPI } from '../api/api';
import Grid from './Grid';
import ProductCard from './ProductCard';
import Section, { SectionBody, SectionTitle } from './Section';

SectionProductsbyCategory.propTypes = {
    category: PropTypes.object
}

function SectionProductsbyCategory(props) {
    const [products, setProducts] = useState([])
    const { category } = props

    useEffect(() => {
        async function getProductByCategory() {
            try {
                const response = await productAPI.getByCategoryId(category._id);
                setProducts(response.data)
            } catch (error) {
                alert(error.response.data.message)
            }
        }
        getProductByCategory()
    },[category])

    return (
        products.length > 0 ?
        <Section>
            <SectionTitle>
                {category.name}
            </SectionTitle>

            <SectionBody>
                <Grid
                    col={5}
                    mdCol={3}
                    smCol={2}
                    gap={20}
                >
                    {
                        products.map((item) => (
                            <ProductCard
                                key={item._id}
                                item={item}
                            />
                        ))
                    }
                </Grid>
            </SectionBody>
        </Section>
        : <></>
    );
}

export default SectionProductsbyCategory;