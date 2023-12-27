/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { useDispatch } from 'react-redux'


import numberWithCommas from '../utils/numberWithCommas';
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import AleartPopup from './alert-popup';
import { isNumber, isObject, isString } from '../utils/validator';
import { addItem } from '../redux/shopping-cart/cartItemsSlide';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const ProductView = props => {
    const history = useHistory()
    const [previewImg, setPreviewImg] = useState(null)

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const [selectedMainClassificationValue, setSelectedMainClassificationValue] = useState(null);

    const [selectedSubClassificationValue, setSelectedSubClassificationValue] = useState(null);

    const [selectedProductDetail, setSelectedProductDetail] = useState(null);

    const [rating, setRating] = useState([]);

    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    const { product } = props

    useEffect(() => {
        if(selectedProductDetail){
            setQuantity(1);
        }
    }, [selectedProductDetail])

    useEffect(() => {
        if(product){
            const foundImage = product.images.find(image => image.mainClassificationValue === selectedMainClassificationValue);
            if(foundImage) setPreviewImg(foundImage.values[0].path);

            let foundDetail = null;
            if(product.subClassification) foundDetail = product.details.find(detail => detail.subClassificationValue === selectedSubClassificationValue && detail.mainClassificationValue === selectedMainClassificationValue); 
            else foundDetail = product.details.find(detail => detail.mainClassificationValue === selectedMainClassificationValue); 

            setSelectedProductDetail(foundDetail);
            
        }
        
    }, [selectedMainClassificationValue, selectedSubClassificationValue, product])

    useEffect(() => {
        if(product){
            const foundImage = product.images[0];
            if(foundImage) setPreviewImg(foundImage.values[0].path)
        }
    }, [product])

    const updateQuantity = (type) => {
        if(type === 'plus' && quantity + 1 <= selectedProductDetail.quantity) setQuantity(quantity + 1);
        if(type === 'minus' && quantity - 1 >= 1) setQuantity(quantity - 1);
    }
    
    const setErrorMessage = (_message) => {
        setTitle('Thêm thất bại');
        setMessage(_message);
        setColor('red');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const setSuccessfulMessage = (_message) => {
        setTitle('Thêm thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const validateCreateFormData = () => {
        console.log(Boolean(!isString(selectedSubClassificationValue) && product.subClassification));
        switch(true){
            case (!isNumber(quantity) || quantity < 0 || quantity > selectedProductDetail?.quantity):{
                setErrorMessage('Số lượng sản phẩm không đủ')
                return false;
            }

            case(!isString(selectedMainClassificationValue)):{
                setErrorMessage(`Vui lòng chọn ${product.mainClassification.title} trước khi thêm vào giỏ`)
                return false;
            }

            case(Boolean(!isString(selectedSubClassificationValue) && product.subClassification)):{
                setErrorMessage(`Vui lòng chọn ${product.subClassification.title} trước khi thêm vào giỏ`)
                return false;
            }

            case(!isObject(selectedProductDetail)): {
                setErrorMessage('Bạn chưa chọn sản phẩm thêm vào giỏ hàng')
                return false;
            }

            default: {return true;}
        }
    }

    const addToCart = () => {
        if(validateCreateFormData()){
            const data = {
                image: product.images.find(image => image.mainClassificationValue === selectedProductDetail.mainClassificationValue)?.values[0],
                quantity,
                productDetailId: selectedProductDetail._id,
                productName: `${product.name} - ${selectedProductDetail.mainClassificationValue}${selectedProductDetail.subClassificationValue ? ' - ' + selectedProductDetail.subClassificationValue : ''}`,
                productId: product._id,
                price: selectedProductDetail.price,
                maxQuantity: selectedProductDetail.quantity,
                productSlug: product.slug
            }
            dispatch(addItem(data));
            setSuccessfulMessage('Thêm sản phẩm vào giỏ hàng thành công');
            return true;
        } 

        return false;
    }

    const goToCart = () => {
        if(addToCart()) history.push('/thanh-toan');
    }

    return (
        product ?
        <>
        <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
         <div className="product">
            <div className="product__images">
                <div className="product__images__list">
                    {
                        product.images.map(
                            image => image.values.map(
                                value => (
                                    <div className="product__images__list__item" onClick={() => setPreviewImg(value.path)}>
                                        <img src={value.path} alt={value.name} />
                                    </div>
                                )
                            )
                        )
                    }
                </div>
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
            </div>
            <div className="product__info">
                <h1 className="product__info__title" >{product.name}</h1>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        {product.mainClassification.title}:
                    </div>
                    <div className="product__info__item__list">
                        {
                            [...new Set(product.details.map(detail => detail.mainClassificationValue))].map((value, index) => (
                                <div key={index} className={`product__info__item__list__item ${selectedMainClassificationValue === value ? 'active': ''}`} onClick={() => setSelectedMainClassificationValue(value)}>
                                    {value}
                                </div>
                            ))
                        }
                    </div>
                </div>
               {
                    product.subClassification &&
                    <div className="product__info__item">
                        <div className="product__info__item__title">
                            {product.subClassification.title}:
                        </div>
                        <div className="product__info__item__list">
                            {
                                [...new Set(product.details.map(detail => detail.subClassificationValue))].map((value, index) => (
                                    <div key={index} className={`product__info__item__list__item ${selectedSubClassificationValue === value ? 'active': ''}`} onClick={() => setSelectedSubClassificationValue(value)}>
                                        {value}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
               }
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Số lượng
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
                    <div style={{marginLeft: '2em', paddingTop: '2px'}}>

                        {
                            selectedProductDetail && selectedProductDetail.quantity > 0 ?
                            <span style={{color:'black'}}>{selectedProductDetail.quantity} sản phẩm có sẵn </span>:
                            (!selectedProductDetail && selectedMainClassificationValue && !product.subClassification) || 
                            (!selectedProductDetail && selectedMainClassificationValue && selectedSubClassificationValue && product.subClassification)  || 
                            (selectedProductDetail?.quantity <= 0)?
                            <span style={{color: 'red'}}>sản phẩm đã được bán hết</span>:
                            <></>
                        }
                    </div>
                </div>
                <div className="product__info__item">
                    <div className="product__info__item__title">
                        Giá:
                    </div>
                    <span className="product__info__item__price">
                        {numberWithCommas(selectedProductDetail ? selectedProductDetail.price: 0)}
                    </span>
                </div>
                <div className="product__info__item">
                    <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
                    <Button onClick={() => goToCart()}>mua ngay</Button>
                </div>
            </div>
        </div>

        <div className={`product-description expand`}>
            <div className="product-description__title">
                Chi tiết sản phẩm
            </div>
            <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
            </div>
        <div className={`product-description mobile expand`}>
            <div className="product-description__title">
                Chi tiết sản phẩm
            </div>
            <div className="product-description__content" dangerouslySetInnerHTML={{__html: product.description}}></div>
        </div>

        </>
        :
        <div>loading</div>
    )
}


ProductView.propTypes = {
    product: PropTypes.object
}

export default withRouter(ProductView)
