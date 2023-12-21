import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from './Search'

import logo from '../assets/images/Logo-2.png'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import CartPre from './CartPre'
import numberWithCommas from '../utils/numberWithCommas'
import { removeToken } from '../redux/token/tokenSlice'
import AleartPopup from './alert-popup'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/san-pham"
    },
    {
        display: "Liên hệ",
        path: "/lien-he"
    },
    {
        display: "Bài viết",
        path: "/tin-tuc"
    }
]

const Header = () => {
    const dispatch = useDispatch();

    const { cartItems, token } = useSelector(state => {
        return {
            cartItems: state.cartItems.value,
            token: state.token.value
        }
    })

    const [showSearchForm, setShowSearchForm] = useState(false);

    const { pathname } = useLocation()

    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const history = useHistory()

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    function handleSearchFormShow() {
        setShowSearchForm(!showSearchForm)
    };

    async function handleSearch(searchTerm) {
        setShowSearchForm(!showSearchForm)
        history.push(`/san-pham?tu-khoa=${searchTerm}`)
    };

    function handleLogout() {
        dispatch(removeToken())
        setSuccessfulMessage('Hẹn gặp lại!')
    }

    const setSuccessfulMessage = (_message) => {
        setTitle('Đăng xuất thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    return (
        <div className="header">
            <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
            <div className="container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            <i className="bx bx-search" onClick={handleSearchFormShow}></i>
                        </div>
                        <div className="header__menu__right__cart" style={{marginLeft: '5px'}}>
                            <Dropdown className="header__menu__right__cart__btn">
                                <Dropdown.Toggle className="header__menu__right__cart__btn__opiton" id="dropdown-custom-components">

                                    <i className="bx bx-shopping-bag" style={{color: 'black', 'font-size': '2em'}} ></i>
                                    {
                                        cartItems.length !== 0 ?
                                            <span className="header__menu__right__cart__btn__opiton__length">{cartItems.reduce((total, item) => total + item.quantity,0)}</span>
                                            : <></>
                                    }
                                        <Dropdown.Menu style={{width: "300px"}}>
                                            {
                                                    <>
                                                        
                                                        {
                                                        cartItems.length!==0?
                                                        <>
                                                            {
                                                                cartItems.map((item) => (
                                                                    <Dropdown.Item className="cartDetails-top">
                                                                        <CartPre item={item} key={item.productDetailId}/>
                                                                    </Dropdown.Item>
                                                                ))
                                                            }
                                                            <Dropdown.Item>
                                                                Tổng tiền: {numberWithCommas(cartItems.reduce((total, item) => total + (item.price * item.quantity),0))}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className="checkout" href="/thanh-toan">
                                                                <div className="checkout__button">Thanh toán</div>  
                                                            </Dropdown.Item>
                                                            
                                                        </>
                                                        :
                                                        <>
                                                            <div className="cartDetails">Giỏ hàng trống.</div>
                                                        </>
                                                        } 
                                                    </>
                                                    
                                            }
                                        </Dropdown.Menu>
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                        <div className="header__menu__item header__menu__right__item" style={{marginLeft: '0px'}}>
                            <Dropdown className="header__menu__right__cart__btn">
                                <Dropdown.Toggle className="header__menu__right__cart__btn__opiton" id="dropdown-custom-components" style={{padding: 0}}>

                                <i className="bx bx-user" style={{color: 'black', 'font-size': '2em'}} ></i>
                                        <Dropdown.Menu style={{width: "100px"}}>
                                            {
                                                token ?
                                                <>
                                                    <Dropdown.Item as={Link} to="/cap-nhat-tai-khoan">
                                                        Xem thông tin
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/don-hang">
                                                        Xem đơn hàng
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={handleLogout}>
                                                        Đăng xuất
                                                    </Dropdown.Item>
                                                </>
                                                :
                                                <>
                                                    <Dropdown.Item as={Link} to="/dang-nhap">
                                                            Đăng nhập
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/dang-ky">
                                                        Đăng Ký
                                                    </Dropdown.Item>
                                                </>
                                            }
                                        </Dropdown.Menu>
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <Search
                showSearchForm={showSearchForm}
                onSearchFormShow={handleSearchFormShow}
                onSearch={handleSearch}
            />
        </div>
    )
}

export default Header