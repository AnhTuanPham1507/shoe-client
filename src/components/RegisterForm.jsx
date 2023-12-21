import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../components/Helmet'

RegisterForm.propTypes = {
    onRegisterSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [address, setAddress] = useState(null)
    const [phone, setPhone] = useState(null)

    const { onRegisterSubmit } = props

    function handleRegisterSubmit(e) {
        e.preventDefault()

        onRegisterSubmit({email,password,fullName,phone,address})
    }
    return (

        <Helmet title="Đăng ký">
            <Col className="registerForm">
                <div className="registerForm__title">
                    <h1>Tạo tài khoản của bạn</h1>
                    <div className="registerForm__intro-text">
                        Một ID là tất cả những gì bạn cần để truy cập vào tất cả các dịch vụ.
                    </div>
                    <div className="registerForm__intro-link">
                        Đã có ID ?<Link className="registerForm__link" to="/quen-mat-khau"> Tìm nó ở đây</Link>
                    </div>
                </div>
                <Form  onSubmit={handleRegisterSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control className="registerForm__input" type="text" placeholder="Tên khách hàng" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b" className="registerForm__input" type="text" placeholder="Số điện thoại" minLength={10} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="registerForm__input" type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control className="registerForm__input" type="text" placeholder="Địa chỉ" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control className="registerForm__input" type="password" placeholder="Mật khẩu" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                   
                    <Button className="registerForm__button"  type="submit">
                        Đăng ký
                    </Button>
                </Form>
            </Col>
        </Helmet>
    );
}

export default RegisterForm;