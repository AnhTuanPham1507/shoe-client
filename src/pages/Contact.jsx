import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { businessInfoAPI, contactAPI } from "../api/api";
import Helmet from "../components/Helmet";
import Iframe from 'react-iframe'
import AleartPopup from "../components/alert-popup";
import { isEmail, isString } from "../utils/validator";
import { AxiosError } from "axios";
import _ from 'lodash';

function Contact() {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  const [message, setMessage] = useState(null);
  const [titleMessage, setTitleMessage] = useState(null);
  const [activeMessage, setActiveMessage] = useState(false);
  const [color, setColor] = useState(null);
 
  const setErrorMessage = (_message, _title) => {
    setTitleMessage(_title || 'Yêu cầu thất bại');
    setMessage(_message);
    setColor('red');
    setActiveMessage(true);
    setTimeout(() => {
        setActiveMessage(false)
    }, 3000)
}

const setSuccessfulMessage = (_message, _title) => {
    setTitleMessage(_title || 'Yêu cầu thành công');
    setMessage(_message);
    setColor('blue');
    setActiveMessage(true);
    setTimeout(() => {
        setActiveMessage(false)
    }, 3000)
}

const validateData = () => {
    switch(true){
        case (!isEmail(email)):{
            setErrorMessage('Email không hợp lệ')
            return false;
        }

        case (!isString(title)):{
            setErrorMessage('Tiêu đề không hợp')
            return false;
        }

        case (!isString(content)):{
            setErrorMessage('Nội dung không hợp lệ')
            return false;
        }

        default: {return true;}
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(!validateData()){
      return;
    }

    try {
      await contactAPI.contact({title,email,content})
      setSuccessfulMessage('Yêu cầu đã được gửi thành công');
    } catch (error) {
      console.log(error);
      setErrorMessage(error instanceof AxiosError && _.first(error.response.data.subMessages) || error.response.data.message )    }
  }

  useEffect(() => {
    const getBusinessInfo = async () => {
      try {
        const getBusinessInfoRes = await businessInfoAPI.getOne();
        setBusinessInfo(getBusinessInfoRes.data);
      } catch (error) {
        console.log(error);
      }
    }

    getBusinessInfo();
  },[])

  return (
    <Helmet title="Liên hệ ">     
      <AleartPopup message={message} title={titleMessage} isActive={activeMessage} color={color} /> 
      <div className="map">
      <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9543420445866!2d106.67525717355133!3d10.738002459904305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1702789014595!5m2!1svi!2s"
            width="100%"
            height="450px"
            id=""
            className=""
            display="block"
            position="relative"
            loading="lazy"
      />
      </div>
        <div className="spad">
          <div className="container">
              <div className="row">
                  <div className="col-lg-6 col-md-6">
                      <div className="contact__text">
                          <div className="section-title">
                              <span>Thông tin</span>
                              <h2>Liên hệ với chúng tôi</h2>
                              <p>
                                Địa chỉ: 350 Cao Lỗ <br />
                                Điện thoại: {businessInfo?.phone} <br />
                                Email: {businessInfo?.email}
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                      <div className="contact__form">
                        <Form onSubmit={handleSubmit}>
                          <Form.Group classNameName="mb-3" controlId="formBasicText">
                            <Form.Control type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control type="text" placeholder="Chủ đề..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" placeholder="Ghi chú..." rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
                          </Form.Group>

                          <div className="d-grid gap-2">
                            <Button className="contact__button" size="lg"  type="submit">
                              gửi
                            </Button>
                          </div>
                        </Form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </Helmet>
  );
}

export default Contact;