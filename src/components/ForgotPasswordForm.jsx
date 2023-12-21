import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function ForgotPasswordForm(props) {
    const { onForgotPasswordFormSubmit } = props
        
    const [email, setEmail] = useState('')

    function handleForgotPasswordFormSubmit(e) {
        e.preventDefault()
        onForgotPasswordFormSubmit(email)
    }
    
    return (

        <>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Quên mật khẩu</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <Link to="/dang-nhap">Đăng nhập</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Quên mật khẩu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Row>
                <Col lg="12" xs="12">
                    <div className="forgotForm__title">
                        Gặp sự cố đăng nhập?
                    </div>
                </Col>
                <Col lg="8" xs="12" className="forgotForm">
                    <h5 className="forgotForm__text">Nhập Email của bạn để bắt đầu.</h5>
                    <Form onSubmit={handleForgotPasswordFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control className="forgotForm__input" type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Button className="forgotForm__button" type="submit">
                            Xác nhận
                        </Button>
                    </Form>
                </Col>
                <Col lg="4" xs="12" className="desktop">
                    <div className="desktop__icon__sidebar">
                        <span className="desktop__icon__sidebar__iconf"></span>
                        <p className="desktop__icon__sidebar__caption">Bạn đã đến đúng nơi để đặt lại mật khẩu bị quên. Để bảo mật cho bạn, chúng tôi sẽ hỏi bạn một số câu hỏi để xác minh rằng bạn là chủ sở hữu của tài khoản này.</p>
                    </div>
                    
                </Col>
            </Row>
        </>
    );
}

export default ForgotPasswordForm;