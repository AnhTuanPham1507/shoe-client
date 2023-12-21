import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/product-modal/productModalSlice'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import { Col } from 'react-bootstrap'

const ProductView = props => {

    const dispatch = useDispatch()

    let {product} = props

    const [previewImg, setPreviewImg] = useState('')

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    useEffect(() => {
        setPreviewImg(product ? product.product.image: '' )
        setQuantity(1)
    }, [product])


    const addToCart = () => {
        const action = addItem({...product,quantity})
        dispatch(action)
        alert('Thêm thành công')
    }

    const goToCart = () => {
        const action = addItem({...product,quantity})
        dispatch(action)
        dispatch(remove())
        props.history.push('/cart')
    }

    return (
        product ? 
        <div className="product">
            <div className="product__images">
                <div className="product__images__main">
                    <img src={`${process.env.REACT_APP_IMAGEURL}${previewImg}`} alt={previewImg} />
                </div>
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.product.image)}>
                        <img src={`${process.env.REACT_APP_IMAGEURL}${product.product.image}`} alt={product.product.image} />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.product.image)}>
                        <img src={`${process.env.REACT_APP_IMAGEURL}${product.product.image}`} alt={product.product.image} />
                    </div>
                </div>
                
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.product.name}}></div>
                    <div className="product-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{product.product.name}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(product.soldPrice )}
                    </span>
                </div>
                {/* <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.colors.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${color === item ? 'active' : ''}`} onClick={() => setColor(item)}>
                                    <div className={`circle bg-${item}`}></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Kích cỡ
                    </div>
                    <div className="product__info__item__list">
                        {
                            product.size.map((item, index) => (
                                <div key={index} className={`product__info__item__list__item ${size === item ? 'active' : ''}`} onClick={() => setSize(item)}>
                                    <span className="product__info__item__list__item__size">
                                        {item}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div> */}
                <div className="product__info__item">
                    <div className="product__info__item__quantity">
                        <div className="product__info__item__title">
                            Số lượng ({product.product.unit})
                        </div>
                        <div className="product__info__item__quantity">
                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
                                <i className="bx bx-minus"></i>
                            </div>
                            <div className="product__info__item__quantity__input">
                                {quantity}
                            </div>
                            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
                                <i className="bx bx-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__info__item">
                    <Col>
                        <Button  onClick={() => {addToCart()}}>thêm vào giỏ</Button>
                    </Col>
                    <Col>
                        {/* <Button onClick={() => {goToCart()}}>mua ngay</Button> */}
                        <Button  onClick={() => {addToCart()}}>Yêu thích</Button>
                    </Col>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
                <div className="product-description__toggle">
                    <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div>
        : 
        <div>loading</div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
