import React, {useEffect, useState} from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import ProductView from '../components/ProductView'

import { productAPI } from '../api/api'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import Grid from '../components/Grid'
import RatingView from '../components/rating-view';

const Product = props => {

    const {slug} = useParams()

    const [product, setProduct] = useState()
    const [relatedProducts, setRelatedProducts] = useState([])

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
        getProduct()
    },[slug])


    return (
        product ?
        <Helmet title={product.name}>
            <Container>
                <Section>
                    <SectionBody>
                        <ProductView product={product}/>
                    </SectionBody>
                </Section>
                <RatingView 
                    product={product}
                />
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
            </Container>
        </Helmet>
        : <div className="loading-screen"></div>
    )
}

export default Product
