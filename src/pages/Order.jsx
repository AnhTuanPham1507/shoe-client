import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { orderAPI } from '../api/api';
import OrderTable from '../components/OrderTable';
import Helmet from '../components/Helmet';
import { Container } from 'react-bootstrap';
import { Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

function Order() {
    const [orders, setOrders] = useState([])
    const token = useSelector(state => state.token.value)
    const [pageCount, setPageCount] = useState(0)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        async function getOrders() {
            try {
                const res = await orderAPI.getAll(`perPage=8&page=${activePage}`,token)
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
        </Helmet>
    );
}

export default Order;   