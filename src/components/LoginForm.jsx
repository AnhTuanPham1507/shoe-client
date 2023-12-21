import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Helmet from '../components/Helmet'

LoginForm.propTypes = {
    onLoginSubmit: PropTypes.func.isRequired
};

function LoginForm(props) {
    const { onLoginSubmit } = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault()
        const formvalues = {
            email,
            password
        }
        onLoginSubmit(formvalues)
    }

    return (
        <Helmet title="Đăng nhập">
            <Col className="loginForm">
                <div className="loginForm__title">
                    Đăng nhập
                </div>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group className="mb-3">
                        
                        <Form.Control pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="loginForm__input" type="text" placeholder="email" minLength={10} name="phone" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        
                        <Form.Control className="loginForm__input" type="password" placeholder="Mật khẩu" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="loginForm__link">
                        <Link to="/cap-nhat-mat-khau">Quên mật khẩu? <FontAwesomeIcon className="userCircle" icon={faUpRightFromSquare} /></Link>
                    </Form.Group>
                    <Form.Group  className="loginForm__link">
                        <span className="loginForm__notlink">Chưa có tài khoản?</span>
                        <Link to="/dang-ky"> Tạo ngay. <FontAwesomeIcon className="userCircle" icon={faUpRightFromSquare} /></Link>
                    </Form.Group>
                    <Button className="loginForm__button" type="submit">
                        Xác nhận
                    </Button>
                </Form>
            </Col>
        </Helmet>
    );
}

export default LoginForm;