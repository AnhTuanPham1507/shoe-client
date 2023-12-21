import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

import Label from '../components/Label';
import formatDate from '../utils/formatDate'
import { MenuItem, Select, TableCell, TableContainer, TableRow } from '@mui/material';
import numberWithCommas from '../utils/numberWithCommas';
import OrderStatusEnum from '../enum/orderStatus';
import PaymentStatusEnum from '../enum/payment-status';

OrderTable.propTypes = {
    listOrder: PropTypes.array.isRequired,
};

function OrderTable(props) {

    const {orders} = props

    return (
        <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
            >
                <TableRow>
                    <TableCell align="left">
                        Tên người nhận
                    </TableCell>

                    <TableCell align="left">
                        Số diện thoại
                    </TableCell>

                    <TableCell align="left">
                        Địa chỉ email
                    </TableCell>

                    <TableCell align="left">
                        Địa chỉ nhận hàng
                    </TableCell>

                    <TableCell align="left">
                        Ngày đặt hàng
                    </TableCell>

                    <TableCell align="left">
                        Chi tiết
                    </TableCell>

                    <TableCell align="left">
                        Tổng giá tiền
                    </TableCell>

                    <TableCell align="left">
                        Trạng thái đơn 
                    </TableCell>

                    <TableCell align="left">
                        Thanh toán
                    </TableCell>
                </TableRow>
                {
                    orders.map(order => (
                        <TableRow>
                            <TableCell align="left">
                                {order.receiverFullName}
                            </TableCell>

                            <TableCell align="left">
                                {order.receiverPhone}
                            </TableCell>

                            <TableCell align="left">
                                {order.receiverEmail}
                            </TableCell>

                            <TableCell align="left">
                                {order.receiverAddress}
                            </TableCell>

                            <TableCell align="left">
                                {formatDate(order.orderAt)}
                            </TableCell>
                        
                            <TableCell align="left">
                                <Select value={order.details[0]?.productName}>
                                    {
                                        order.details.map(detail => (
                                            <MenuItem value={detail.productName}>
                                                Sản phẩm: <strong>{detail.productName}</strong>  <br/>
                                                Số lượng: <strong>{detail.quantity}</strong> <br/>
                                                Giá: <strong>{numberWithCommas(detail.price)}</strong>
                                            </MenuItem> 
                                        ))
                                    }
                                </Select>
                            </TableCell>

                            <TableCell>
                                {numberWithCommas(order.totalPrice)}
                            </TableCell>

                            <TableCell >
                                <Label color={(order.status === 'failed' && 'error') || 'success'}>
                                    {OrderStatusEnum[order.status]}
                                </Label>
                            </TableCell>

                            <TableCell >
                                <Label color={(order.paymentStatus === 'failed' && 'error') || 'success'}>
                                    {PaymentStatusEnum[order.paymentStatus]}
                                </Label>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>
        </TableContainer>
    );
}

export default OrderTable;