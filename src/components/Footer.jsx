import React, { useEffect, useState } from "react";
import { businessInfoAPI } from "../api/api";
import Grid from "./Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import formatDate from "../utils/formatDate";

const Footer = () => {
    const [businessInfo, setBusinessInfo] = useState(null);
    
    useEffect(() => {
       const initialData = async () => {
            try {
                const getBusinessDataRes = await businessInfoAPI.getOne();
                const tempBusinessInfo = getBusinessDataRes.data;
                setBusinessInfo(tempBusinessInfo);
            } catch (error) {
                console.log(error)
            }
       }

       initialData();
    }, []);
    return (
    businessInfo &&
    <footer className="footer">
        <div className="container">
        <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={10}
        >
            <div>
                <div className="footer__title">
                <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ
                </div>
                <div className="footer__content">
                    350 Cao lỗ, quận 8
                </div>
                <div className="footer__border"></div>
                <div className="footer__title">
                <FontAwesomeIcon icon={faPhone} /> Liên hệ
                </div>
                <div className="footer__content">
                    {
                        <p>
                            <strong>Số điện thoại: </strong>{businessInfo.phone}
                        </p>
                    }
                    {
                        <p>
                            <strong>Email: </strong>{businessInfo.email}
                        </p>
                    }
                </div>
            </div>
        </Grid>
        <Row>
            <div className="footer__buttom"></div>
            <div className="col-7 col-lg-4 ">
                <div className="footer__copyright__text">
                    
                    <p>Copyright ©
                        <script>
                            {formatDate(new Date())}
                        </script>
                        Phuc. All rights reserved.
                    </p>
                    
                </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block footer__img"></div>
            <div className="col-5 col-lg-2">
                <div className="footer__img">
                    {/* <img src={logoFooter} className="img_logo_footer" alt={logoFooter} /> */}
                </div>
            </div>
        </Row> 
        </div>
    </footer>
  );
};

export default Footer;
