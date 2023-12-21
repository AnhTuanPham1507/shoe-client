import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'

import numberWithCommas from '../utils/numberWithCommas'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const CartForCheckout = () => {

    const cartItems = useSelector((state) => state.cartItems.value)

    const [totalBill, setTotalBill] = useState(0)


    useEffect(() => {
        setTotalBill(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
    }, [cartItems])


    return (
        <Helmet title="Thanh toán">
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Thanh toán</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Thanh tóan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="cart">
                <div className="cart__list">
                    <div className="shopping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tạm tính</th>
                                    <th></th>
                                </tr>
                            </thead>
                                {
                                    cartItems.map((item) => (
                                        <CartItem item={item} key={item._id}/>
                                    ))
                                }
                        </table>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="cart__discount">
                    </div>
                    <div className="cart__total">
                        <h6>Tổng cộng</h6>
                        <ul>
                            <li>Tạm tính: <span>{numberWithCommas(Number(totalBill))}</span></li>
                            <li>Giảm Giá :<span>{numberWithCommas(0)}</span></li>
                            <li>Tổng tiền :<span>{numberWithCommas(Number(totalBill))}</span></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default CartForCheckout
