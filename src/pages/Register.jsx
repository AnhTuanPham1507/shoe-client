import React, { useState } from 'react';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';

import RegisterForm from '../components/RegisterForm';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';
import { isEmail, isPhone, isString, minLength } from '../utils/validator';
import AleartPopup from '../components/alert-popup';
import { AxiosError } from 'axios';
import _ from 'lodash';

function Register() {
    const history = useHistory()
    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    const validateCustomerData = (registerData) => {
        switch(true){
            case (!isString(registerData.fullName)):{
                setErrorMessage('Họ tên không hợp lệ');
                return false;
            }

            case (!isString(registerData.address)):{
                setErrorMessage('Địa chỉ không hợp lệ');
                return false;
            }

            case(!isEmail(registerData.email)):{
                setErrorMessage('Email không hợp lệ');
                return false;
            }

            case(!isPhone(registerData.phone)):{
                setErrorMessage('Số điện thoại không hợp lệ');
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


    function handleRegisterSubmit(registerData) {
        async function createCustomer() {
            try {
                await customerAPI.register(registerData)
                setSuccessfulMessage(`Đăng ký thành công, chào mừng ${registerData.fullName}`);
                setTimeout(() => {
                    history.push('/dang-nhap')
                }, 2000)
            }
            catch (error) {
                setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )
            }
        }
        if(validateCustomerData(registerData)) createCustomer()
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
                                <h3>Đăng ký</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Đăng ký</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RegisterForm onRegisterSubmit={handleRegisterSubmit} />
            </Container>
        </>
        
    );
}

export default Register;