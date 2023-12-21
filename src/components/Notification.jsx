import React from 'react';
import { fToNow } from '../utils/formatDate';


Notification.propTypes = {

};

function Notification(props) {
    const { notification } = props
    return (
        <div className="notification">
            <div className="notification__left">
                <img className="notification__left__img" src={``} alt="notification_left"></img>
            </div>
            <div className="notification__right">
                {/* <h2 className="notification__right__title">Đơn hàng {orderStatus[notification?.r_order.status]}</h2> */}
                <div className="notification__right__content">
                    <div dangerouslySetInnerHTML={{ __html: notification.content }} />
                </div>
                <p className='notification__right__date'>{fToNow(notification?.createdAt)}</p>
            </div>
            <br />
        </div>
    );
}

export default Notification;