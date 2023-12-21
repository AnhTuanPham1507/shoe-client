import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ProductView from './ProductView'


import { remove } from '../redux/product-modal/productModalSlice'

import { productAPI } from '../api/api'
import Section, { SectionBody, SectionTitle } from './Section'
import Grid from './Grid'
import ProductCard from './ProductCard'
import { Button } from 'react-bootstrap'

const ProductViewModal = () => {

    const slug = useSelector((state) => state.productModal.value)
    const dispatch = useDispatch()
    const [relatedProducts, setRelatedProducts] = useState([])

    const [product, setProduct] = useState(null)

    useEffect(() => {
        async function getProduct() {
            try {
                const resProduct = await productAPI.getBySlug(slug);
                const tempProduct = resProduct.data

                const resRelatedProduct = await productAPI.getAll(`categoryIds[]=${tempProduct.category._id}&perPage=6`)
                const tempRelatedproducts = resRelatedProduct.data.data

                setProduct(tempProduct)
                setRelatedProducts(tempRelatedproducts)
            } catch (error) {
                console.log(error)
            }
        }
        if(slug) getProduct();
        else setProduct(null);
    },[slug])


    return (
        <div className={`product-view__modal ${!product ? '' : 'active'}`}>
            <div className="product-view__modal__content">
                <ProductView product={product}/>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"    
                        onClick={() => {console.log('haha'); dispatch(remove())}}
                    >
                        đóng
                    </Button>
                </div>
                <Section>
                    <SectionTitle>
                        <h1 style={{textAlign: 'center'}}>Khám phá thêm</h1>
                    </SectionTitle>
                    <SectionBody>
                        <Grid col={5} mdCol={3} smCol={2} gap={20}>
                            {   
                                relatedProducts.map((item) => (
                                    <ProductCard
                                            key={item.id}
                                            item={item}
                                    />
                                ))
                            }
                        </Grid>
                    </SectionBody>
                </Section>
            </div>
        </div>
    )
}

export default ProductViewModal