import React, { useState } from 'react';

import { Container } from 'react-bootstrap';

import LoginForm from '../components/LoginForm';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customerAPI } from '../api/api';
import { addToken } from '../redux/token/tokenSlice';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';
import { isEmail, isString, minLength } from '../utils/validator';
import AleartPopup from '../components/alert-popup';
import { AxiosError } from 'axios';

function Login() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    const validateCustomerData = (registerData) => {
        switch(true){
            case(!isEmail(registerData.email)):{
                setErrorMessage('Email không hợp lệ');
                return false;
            }

            case(!isString(registerData.password) || !minLength(registerData.password, 8)):{
                setErrorMessage('Mật khẩu không hợp lệ. Ít nhất 8 ký tự bất kỳ')
                return false;
            }

            default: {
                return true;
            }
        }
    }

    const setErrorMessage = (_message) => {
        setTitle('Đăng nhập thất bại');
        setMessage(_message);
        setColor('red');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const setSuccessfulMessage = (_message) => {
        setTitle('Đăng nhập thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    async function handleLoginSubmit(loginPayload) {
        if(validateCustomerData(loginPayload)){
            try {
                const res = await customerAPI.login(loginPayload)
                const response = res.data
                setSuccessfulMessage(`Đăng nhập thành công, chào mừng bạn`);
                dispatch(addToken(response.accessToken))
                setTimeout(() => {
                    history.goBack()
                }, 1000)
            }
            catch (error) {
                setErrorMessage(error instanceof AxiosError && (error.response.data.message) )
            }
        }
    }

    return (
        <>
            <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
            <Container>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Đăng Nhập</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Đăng nhập</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <LoginForm onLoginSubmit={handleLoginSubmit} />
            </Container>
        </>
       
    );
}

export default Login;