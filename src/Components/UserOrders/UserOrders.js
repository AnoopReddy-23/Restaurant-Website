import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrders } from '../../Slices/orderSlice';
import { Badge, Container, Row, Col } from 'react-bootstrap';
import { FaBoxOpen, FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';
import './UserOrders.css';

function UserOrders() {
    const dispatch = useDispatch();
    const { userObj } = useSelector(state => state.user);
    const { orders, isLoading } = useSelector(state => state.orders);

    useEffect(() => {
        if (userObj.username) {
            dispatch(getUserOrders(userObj.username));
        }
    }, [userObj.username, dispatch]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Placed': return <FaClock className="text-warning" />;
            case 'Preparing': return <FaBoxOpen className="text-gold" />;
            case 'Out for Delivery': return <FaTruck className="text-info" />;
            case 'Delivered': return <FaCheckCircle className="text-success" />;
            default: return <FaClock />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Placed': return <Badge bg="secondary">Placed</Badge>;
            case 'Preparing': return <Badge bg="warning" text="dark">Preparing</Badge>;
            case 'Out for Delivery': return <Badge bg="info">En Route</Badge>;
            case 'Delivered': return <Badge bg="success">Delivered</Badge>;
            default: return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Container className="py-5">
            <h2 className="section-title text-start mb-5">Your Order History</h2>
            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-gold" role="status"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="empty-orders text-center py-5 glass-card">
                    <h3 className="text-muted">No orders found. Start your journey with TastyNest!</h3>
                </div>
            ) : (
                <div className="orders-timeline">
                    {orders.map((order) => (
                        <div key={order._id} className="order-item-card glass-card p-4 mb-4 animate__animated animate__fadeInUp">
                            <Row className="align-items-center">
                                <Col md={2} className="text-center">
                                    <div className="order-icon-wrapper">
                                        {getStatusIcon(order.status)}
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <h4 className="text-gold mb-1">Order #{order._id.slice(-6).toUpperCase()}</h4>
                                    <p className="text-muted small mb-0">
                                        {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                                    </p>
                                </Col>
                                <Col md={3}>
                                    <div className="status-info">
                                        <p className="mb-1 small text-muted">Status</p>
                                        {getStatusBadge(order.status)}
                                    </div>
                                </Col>
                                <Col md={3} className="text-end">
                                    <p className="mb-1 small text-muted">Total Amount</p>
                                    <h4 className="text-gold mb-0">Rs. {order.totalAmount}</h4>
                                </Col>
                            </Row>
                            <hr className="my-3 opacity-25" />
                            <div className="order-items-preview d-flex gap-3 flex-wrap">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="preview-item">
                                        <span className="text-main">{item.food}</span>
                                        <Badge bg="dark" className="ms-2">x{item.count}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}

export default UserOrders;
