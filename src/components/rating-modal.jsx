import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { AxiosError } from 'axios';
import {ratingAPI} from '../api/api';
import AleartPopup from './alert-popup';
import { isArray, isNumber, isString } from '../utils/validator';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function RatingViewModal(props) {
    const token = useSelector(state => state.token.value);

    const {order, ratingId, isShow, onClose} = props;

    const [star, setStar] = useState(5)
    const [content, setContent] = useState('')
    const [ratingProducts, setRatingProducts] = useState([])

    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    useEffect(() => {
        if(order){
            setRatingProducts(order.details.map(detail => detail.productId));
        }
    }, [order])

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
        setTitle('Đánh giá thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    function handleClose() {
        onClose(false)
    }

    function handleChangeRatingProducts(id){
        let tempRatingProducts = []
        if(ratingProducts.includes(id)){
            tempRatingProducts = ratingProducts.filter(p => p !== id)
        } else {
            tempRatingProducts = [...ratingProducts,id]
        }
        setRatingProducts(tempRatingProducts)
    }

    const validateRatingPayload = () => {
        switch(true){
            case (!isString(content)):{
                setErrorMessage('Nội dung đánh giá không hợp lệ');
                return false;
            }

            case (!isNumber(star)):{
                setErrorMessage('Số sao đánh giá không hợp lệ');
                return false;
            }

            case(!isArray(ratingProducts) || ratingProducts.length <= 0):{
                setErrorMessage('Vui lòng chọn sản phẩm đánh giá');
                return false;
            }

            case(!isString(ratingId)):{
                setErrorMessage('Không thể thực hiện đánh giá');
                return false;
            }

            default: {
                return true;
            }
        }
    }

    async function handleUpdateComment(){
        try {
            if(validateRatingPayload()){
                await ratingAPI.update(ratingId, {content, ratingStar: star, productIds: ratingProducts}, token);
                setSuccessfulMessage('Cảm ơn bạn đã dành thời gian đánh giá sản phẩm của chúng tôi');
                setTimeout(() => {
                    handleClose();
                }, 3000)
            } 
        } catch (error) {
            setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )
        }
    }

    return (
        <div className={`product-view__modal ${isShow ? "active" : ""}`}>
            <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
            <div className="product-view__modal__content">
                <div class="h-30 row d-flex justify-content-center">
                    <div class="col-lg-8 centered">
                        <div class="blog__details__comment">
                            <h4 style={{ textAlign: "center", marginBottom: "15px" }}>Hãy cho chúng tôi biết trải nghiệm đơn hàng mà bạn vừa đặt</h4>
                            <div class="blog__details__evaluate">
                                <div className="row">
                                    <div class="col-lg-6 col-md-6">
                                        <h5 >Chọn sản phẩm bạn muốn đánh giá</h5>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between"}} class="col-lg-6 col-md-6">
                                        {
                                            order?.details.map(detail =>
                                                <Form.Check
                                                    type="checkbox"
                                                    label={detail.productName}
                                                    defaultChecked
                                                    onChange={(e) => {handleChangeRatingProducts(detail.productId)}}
                                                />
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div class="blog__details__evaluate">
                                <div className="row">
                                    <div class="col-lg-6 col-md-6">
                                        <h5 >Mức độ hài lòng của bạn</h5>
                                    </div>
                                    <div class="col-lg-6 col-md-6">
                                        <StarRatings
                                            rating={star}
                                            starRatedColor="#fa8c16"
                                            changeRating={(star) => setStar(star)}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="25px"
                                            starSpacing="5px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", alignItems: "center" }} class="col-lg-12 text-center">
                                    <textarea style={{ height: "100px", width: "100%" }} value={content} onChange={(e) => setContent(e.target.value)} class="comment_content"
                                        placeholder="Mời bạn đánh giá về sản phẩm..."></textarea>
                                    <Button style={{ width: "300px", marginTop: "10px" }} onClick={handleUpdateComment} class="site-btn send-comment">Gửi đánh
                                        giá</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-view__modal__content__close">
                    <Button
                        size="sm"
                        onClick={() => handleClose()}
                    >
                        đóng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default RatingViewModal;