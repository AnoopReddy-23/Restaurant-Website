import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../../Slices/orderSlice';
import { Table, Form, Container, Badge } from 'react-bootstrap';
import { FaUser, FaCalendarAlt, FaConciergeBell } from 'react-icons/fa';
import './AdminOrders.css';

function AdminOrders() {
    const dispatch = useDispatch();
    const { orders, isLoading } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Placed': return 'status-placed';
            case 'Preparing': return 'status-preparing';
            case 'Out for Delivery': return 'status-delivery';
            case 'Delivered': return 'status-delivered';
            default: return '';
        }
    };

    return (
        <Container fluid className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                <h2 className="text-gold mb-0">Live Order Management</h2>
                <Badge bg="dark" className="p-2 border border-gold">
                    <FaConciergeBell className="me-2" />
                    {orders.filter(o => o.status !== 'Delivered').length} Pending Orders
                </Badge>
            </div>

            {isLoading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-gold" role="status"></div>
                </div>
            ) : (
                <div className="glass-card overflow-hidden animate__animated animate__fadeIn">
                    <Table responsive hover variant="dark" className="mb-0 admin-orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date & Time</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <span className="text-gold font-monospace">#{order._id.slice(-6).toUpperCase()}</span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar-circle">
                                                <FaUser size={12} />
                                            </div>
                                            {order.username}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small">
                                            <FaCalendarAlt className="me-2 text-muted" />
                                            {new Date(order.orderDate).toLocaleDateString()}
                                            <br />
                                            <span className="text-muted">{new Date(order.orderDate).toLocaleTimeString()}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="order-items-cell">
                                            {order.items.map((item, i) => (
                                                <div key={i} className="small text-nowrap">
                                                    • {item.food} <span className="text-muted">(x{item.count})</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-gold fw-bold">Rs. {order.totalAmount}</span>
                                    </td>
                                    <td>
                                        <Form.Select 
                                            size="sm" 
                                            className={`status-select ${getStatusClass(order.status)}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={order.status === 'Delivered'}
                                        >
                                            <option value="Placed">Placed</option>
                                            <option value="Preparing">Preparing</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </Form.Select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}

export default AdminOrders;
