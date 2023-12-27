import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { orderAPI, ratingAPI } from '../api/api';
import OrderTable from '../components/OrderTable';
import Helmet from '../components/Helmet';
import { Container } from 'react-bootstrap';
import { Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import RatingViewModal from '../components/rating-modal';

function Order() {
    const [orders, setOrders] = useState([])
    const [rating, setRating] = useState(null);
    const [isShowRatingModal, setIsShowRatingModal] = useState(false);
    const token = useSelector(state => state.token.value)
    const [pageCount, setPageCount] = useState(0)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        async function getOrders() {
            try {
                const res = await orderAPI.getAll(`perPage=8&page=${activePage}&sort=desc&sortBy=createdAt`,token)
                const data = res.data.data
                setOrders(data)
                setPageCount(res.data.totalPage)
            } catch (error) {
                alert(`Xin lỗi đã có lỗi trong quá trình tải, vui lòng thử lại sau`)
            }
        }
        if(token)
            getOrders()
    }, [token, activePage])

    useEffect(() => {
        async function getRating() {
            try {
                const res = await ratingAPI.getByOrder(orders[0]._id);
                const data = res.data;
                setRating(data);
                if(data?.status === 'new') setIsShowRatingModal(true);
            } catch (error) {
                console.log(error)
            }
        }

        if(orders && orders.length > 0){
            getRating()
        }
    }, [orders])

    const handlePageClick = (event) => {
        setActivePage(event.selected + 1);
    };

    return (
        <Helmet title="Đơn hàng">
            <Container>
                <section className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__text">
                                    <h3>Đơn hàng</h3>
                                    <div className="breadcrumb__links">
                                        <Link to="/">Trang chủ</Link>
                                        <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                        <span>Đơn hàng của tôi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <OrderTable orders={orders} />
                {
                    orders.length > 0 &&
                    <ReactPaginate
                    className="pagination"
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={8}
                    pageCount={pageCount? pageCount: 0}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    />
                }
            </Container>
            <RatingViewModal
                isShow={isShowRatingModal}
                onClose={() => {setIsShowRatingModal(false)}}
                ratingId={rating?._id}
                order={orders[0]}
            />
        </Helmet>
    );
}

export default Order;   