import React, { useState } from 'react';
import { customerAPI } from '../api/api';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { Container } from 'react-bootstrap';
import { isEmail } from '../utils/validator';
import AleartPopup from '../components/alert-popup';
import { AxiosError } from 'axios';
import _ from 'lodash';

function ForgotPassword() {
    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState(null);
    const [activeMessage, setActiveMessage] = useState(false);
    const [color, setColor] = useState(null);

    const setErrorMessage = (_message) => {
        setTitle('Yêu cầu thất bại');
        setMessage(_message);
        setColor('red');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    const setSuccessfulMessage = (_message) => {
        setTitle('Yêu cầu thành công');
        setMessage(_message);
        setColor('blue');
        setActiveMessage(true);
        setTimeout(() => {
            setActiveMessage(false)
        }, 3000)
    }

    async function handleForgotPasswordFormSubmit(email) {
        if(!isEmail(email)){
            setErrorMessage('Email không hợp lệ');
            return;
        }

        try {
            await customerAPI.forgotPassword(email)
            setSuccessfulMessage(`Vui lòng kiểm tra email để lấy mật khẩu hiện tại`)
        } catch (error) {
            console.log(error);
            setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )
        }
    }

    return (
        <Container>
            <AleartPopup message={message} title={title} isActive={activeMessage} color={color} />
            <ForgotPasswordForm onForgotPasswordFormSubmit={handleForgotPasswordFormSubmit} />
        </Container>
    )
}

export default ForgotPassword;