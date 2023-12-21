import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

import { useDispatch } from 'react-redux'

import { addItem } from '../redux/shopping-cart/cartItemsSlide'
import { remove } from '../redux/news-modal/NewsModalSlice'

import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import { Col } from 'react-bootstrap'

const ProductView = props => {

    const dispatch = useDispatch()

    let {news} = props

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
        setPreviewImg(news ? news.news.image: '' )
        setQuantity(1)
    }, [news])


    const addToCart = () => {
        const action = addItem({...news,quantity})
        dispatch(action)
        alert('Thêm thành công')
    }

    const goToCart = () => {
        const action = addItem({...news,quantity})
        dispatch(action)
        dispatch(remove())
        props.history.push('/cart')
    }

    return (
        news ? 
        <div className="news">
            <div className="product__images">
                <div className="product__images__main">
                    <img src={`${process.env.REACT_APP_IMAGEURL}${previewImg}`} alt={previewImg} />
                </div>
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(news.news.image)}>
                        <img src={`${process.env.REACT_APP_IMAGEURL}${news.news.image}`} alt={news.news.image} />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(news.news.image)}>
                        <img src={`${process.env.REACT_APP_IMAGEURL}${news.news.image}`} alt={news.news.image} />
                    </div>
                </div>
                
                <div className={`news-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="news-description__title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="news-description__content" dangerouslySetInnerHTML={{__html: news.news.name}}></div>
                    <div className="news-description__toggle">
                        <Button size="sm" onClick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title">{news.news.name}</h1>
                <div className="product__info__item">
                    <span className="product__info__item__price">
                        {numberWithCommas(news.soldPrice )}
                    </span>
                </div>
                {/* <div className="product__info__item">
                    <div className="product__info__item__title">
                        Màu sắc
                    </div>
                    <div className="product__info__item__list">
                        {
                            news.colors.map((item, index) => (
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
                            news.size.map((item, index) => (
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
                            Số lượng ({news.news.unit})
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
            <div className={`news-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="news-description__title">
                    Chi tiết sản phẩm
                </div>
                <div className="news-description__content" dangerouslySetInnerHTML={{__html: news.description}}></div>
                <div className="news-description__toggle">
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
    news: PropTypes.object
}

export default withRouter(ProductView)
