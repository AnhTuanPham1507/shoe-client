import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Helmet from '../components/Helmet'
import { Button, Container, Form } from 'react-bootstrap';
import { customerAPI, orderAPI } from '../api/api'
import { useDispatch } from 'react-redux'
import { removeAll } from '../redux/shopping-cart/cartItemsSlide'
import CartForCheckout from './CartForCheckout';
import AleartPopup from '../components/alert-popup';
import { isEmail, isPhone, isString } from '../utils/validator';
import { AxiosError } from 'axios';
import _ from 'lodash';

const Checkout = () => {
    const token = useSelector(state => state.token.value)

    const cartItems = useSelector((state) => state.cartItems.value)

    const dispatch = useDispatch()

    const history = useHistory()

    const [receiverPhone, setReceiverPhone] = useState(null)

    const [receiverEmail, setReceiverEmail] = useState(null)

    const [receiverFullName, setReceiverFullName] = useState(null)

    const [receiverAddress, setReceiverAddress] = useState(null)

    const [paymentMethod, setPaymentMethod] = useState('in_person')

    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    useEffect(() => {
        if (!token){
            setErrorMessage('Vui lòng đăng nhập để tiến hành thanh toán', 'Không thể thanh toán')
            setTimeout(() => {
                history.push('/dang-nhap')
            }, 2500)
        }

        async function getUserInfo() {
            try {
                const res = await customerAPI.getInfo(token)
                console.log(res)
                const user = res.data
                setReceiverPhone(user.phone)
                setReceiverEmail(user.email)
                setReceiverFullName(user.fullName)
                setReceiverAddress(user.address);
            } catch (error) {
                console.log(error);
            }
        }
        getUserInfo()
    }, [token, history])

    const setErrorMessage = (_message, _title) => {
        setTitle(_title || 'Đặt hàng thất bại');
        setMessage(_message);
        setColor('red');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const setSuccessfulMessage = (_message, _title) => {
        setTitle(_title || 'Đặt hàng thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const validateOrderData = () => {
        switch(true){
            case (!isString(receiverAddress)):{
                setErrorMessage('Đia chị không hợp lệ')
                return false;
            }

            case (!isString(receiverFullName)):{
                setErrorMessage('Tên người nhận không hợp lệ')
                return false;
            }

            case (!isPhone(receiverPhone)):{
                setErrorMessage('Số điện thoại không hợp lệ')
                return false;
            }

            case (!isEmail(receiverEmail)):{
                setErrorMessage('Email không hợp lệ')
                return false;
            }

            default: {return true;}
        }
    }

    async function handleCreateOrder() {
        try {
           if(validateOrderData()){
                const createOrder = {
                    receiverFullName,
                    receiverPhone,
                    receiverEmail,
                    receiverAddress,
                    paymentMethod,
                    details: cartItems.map(item => ({
                        quantity: item.quantity,
                        productName: item.productName,
                        productDetailId: item.productDetailId,
                        productId: item.productId
                    }))        
                }

                const res = await orderAPI.create(createOrder)
                dispatch(removeAll())
                setSuccessfulMessage('Đặt hàng thành công. Cảm ơn bạn đã tin tưởng');
                setTimeout(() => {
                    if (paymentMethod === 'in_person') {
                        history.push(res.data.redirectUrl)
                    } else {
                        window.location.href = res.data.redirectUrl;
                    }
                }, 2000)
                
           }
        } catch (error) {
            console.log(error);
            setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )
        } 
    }

    return (
        <Helmet title="Thanh toán">
            <Container>
            <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
            <CartForCheckout></CartForCheckout>
            <div class="checkout__form">
                <h4 class="checkout__title">Điền thông tin gửi hàng</h4>
                <Form>
                    <div class="row">
                        <div class="col-lg-7 col-md-6">
                            <div class="row">
                                <div class="">
                                    <div class="checkout__input ">
                                        <h4 classReceiverFullName="border__title">Thông tin giao hàng</h4>
                                        <Form.Control
                                            type="text"
                                            placeholder="Tên người nhận"
                                            value={receiverFullName}
                                            onChange={(e) => setReceiverFullName(e.target.value)}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="số điện thoại"
                                            value={receiverPhone}
                                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                                            onChange={(e) => setReceiverPhone(e.target.value)}
                                        />
                                        <Form.Control
                                            type="email"
                                            placeholder="email"
                                            value={receiverEmail}
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                            onChange={(e) => setReceiverEmail(e.target.value)}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="Địa chỉ nhận hàng"
                                            value={receiverAddress}
                                            onChange={(e) => setReceiverAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <h4 classReceiverFullName="border__title">Phương thức thanh toán</h4>

                                <div className="custom-radios">
                                    <div>
                                        <input type="radio" id="color-3" name="paymentMethod" value="in_person" checked
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label for="color-3">
                                            <span className="bgColor">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                            </span>
                                            <span className="bgimg">
                                                <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg" alt="Checked Icon" />
                                            </span>
                                            <span className="text">Liên hệ để thanh toán</span>
                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" id="color-4" name="paymentMethod" value="momo"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label for="color-4">
                                            <span className="bgColor">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
                                            </span>
                                            <span className="bgimg">
                                                <img src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png" alt="Checked Icon" />
                                            </span>
                                            <span className="text">MoMo</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Form>
                <Button onClick={() => {handleCreateOrder()}} class="checkout__button" style={{width: '58%'}}>
                        Đặt hàng
                </Button>
            </div>
            
            </Container>
        </Helmet>
    )
}

export default Checkout
