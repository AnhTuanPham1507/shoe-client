import React, { useState } from 'react';

import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customerAPI } from '../api/api';

import UpdateUserForm from '../components/UpdateUserForm';

import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmail, isPhone, isString } from '../utils/validator';
import { AxiosError } from 'axios';
import AleartPopup from '../components/alert-popup';

import _ from 'lodash';

function UpdateUser() {
    const token = useSelector(state => state.token.value)
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

            default: {
                return true;
            }
        }
    }

    const setErrorMessage = (_message) => {
        setTitle('Cập nhật thất bại');
        setMessage(_message);
        setColor('red');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const setSuccessfulMessage = (_message) => {
        setTitle('Cập nhật thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    function handleUpdateUserSubmit(updateUser) {
        async function updateCustomer() {
            try {
                await customerAPI.update(updateUser, token)
                setSuccessfulMessage('Cập nhật thông tin thành công');
            }
            catch (error) {
                console.log(error);
                setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )
            }
        }

        if(validateCustomerData(updateUser)) {
            updateCustomer()
        }
    }

    return (
        <Container>
            <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Cập nhật thông tin</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Cập nhật thông tin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UpdateUserForm onUpdateUserSubmit={handleUpdateUserSubmit} />
        </Container>
    );
}

export default UpdateUser;