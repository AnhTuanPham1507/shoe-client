import React, { useState } from 'react';

import { Container } from 'react-bootstrap';

import UpdatePasswordForm from '../components/UpdatePasswordForm';

import { useHistory } from 'react-router';
import { customerAPI } from '../api/api';
import { Link } from 'react-router-dom';
import useQuery from '../hooks/useQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { isEmail, isString } from '../utils/validator';
import { AxiosError } from 'axios';
import AleartPopup from '../components/alert-popup';
import _ from 'lodash';

function UpdatePassword() {
    const history = useHistory();
    const email = useQuery().get("email");
    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    const validateCustomerData = ({newPassword, oldPassword}) => {
        switch(true){
            case(!isEmail(email)):{
                setErrorMessage('Email không hợp lệ');
                return false;
            }

            case(!isString(newPassword) || newPassword.length < 8):{
                setErrorMessage('Mật khẩu mới không hợp lệ, nó phải chứa ít nhất 8 ký tự');
                return false;
            }

            case(!isString(oldPassword) || oldPassword.length < 8):{
                setErrorMessage('Mật khẩu cũ không hợp lệ, nó phải chứa ít nhất 8 ký tự');
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

    async function handleUpdatePasswordSubmit({newPassword, oldPassword}) {
        if(!validateCustomerData({newPassword, oldPassword})){
            return;
        }

        try {
            await customerAPI.updatePassword({newPassword, oldPassword, email})
            setSuccessfulMessage('Cập nhật mật khẩu thành công')
            setTimeout(() => {
                history.push('/dang-nhap')
            }, 1000)
        } catch (error) {
            setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )
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
                                <h3>Cập nhật mật khẩu mới</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Cập nhật mật khẩu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <UpdatePasswordForm onUpdatePasswordSubmit={handleUpdatePasswordSubmit} />
        </Container>
    );
}

export default UpdatePassword;