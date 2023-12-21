import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function UpdatePasswordForm(props) {
    const { onUpdatePasswordSubmit } = props
        
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleUpdatePasswordFormSubmit(e) {
        e.preventDefault()
        onUpdatePasswordSubmit({oldPassword, newPassword})
    }

    return (
        <>
            <Col className="loginForm">
                <div className="loginForm__title">
                    Nhập mật khẩu mới
                </div>
                <Form onSubmit={handleUpdatePasswordFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control className="loginForm__input" type="password" placeholder="mật khẩu hiện tại" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control className="loginForm__input" type="password" placeholder="mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        
                        <Form.Control className="loginForm__input" type="password" placeholder="xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                       {
                            (confirmPassword !== '' && newPassword !== confirmPassword) &&
                            <Alert variant="danger">
                                Mật khẩu bạn nhập chưa khớp
                            </Alert>
                       }
                    </Form.Group>

                    <Button className="loginForm__button btn" variant="primary" type="submit">
                        Xác nhận
                    </Button>
                </Form>
            </Col>
        </> 
    );
}

export default UpdatePasswordForm;