import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CartCard from '../CartCard/CartCard'
import { Button, Form, Row, Col, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { CartItems } from '../../Slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

import { toast } from 'react-hot-toast'
import { createOrder } from '../../Slices/orderSlice'
import { clearCartItems } from '../../Slices/cartSlice'
import { FaMapMarkerAlt, FaTruck, FaChevronRight } from 'react-icons/fa'

function Cart() {
  let [products, setProducts] = useState([])
  let [price, setPrice] = useState(0)

  let { userObj, isSuccess: isuserSuccess } = useSelector((state) => state.user)
  let { cartItems, isError, isSuccess, errMsg } = useSelector(
    (state) => state.cart,
  )

  let dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    if (userObj.username) {
      dispatch(CartItems(userObj.username))
    }
  }, [userObj.username, dispatch])

  useEffect(() => {
    if (isError) {
      console.error(errMsg)
    }
    if (isSuccess) {
      let newArray = cartItems.filter(
        (item) => item.username === userObj.username,
      )
      setProducts(newArray)
    }
  }, [isSuccess, isError, cartItems, userObj.username, errMsg])

  const handlePrice = () => {
    let ans = 0
    products.forEach((item) => (ans += item.count * +item.cost))
    setPrice(ans)
  }

  const handleChange = async (item, d) => {
    let quantity = item.count + d

    if (quantity === 0) {
      handleRemove(item._id)
      return
    }

    if (quantity < 0) return

    const obj = { ...item, count: quantity }

    try {
      await axios.put('/cart-api/update-cartitem', obj)
      dispatch(CartItems(userObj.username))
    } catch (err) {
      toast.error('Failed to update cart')
    }
  }

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/cart-api/remove-cartitem/${id}`)
      dispatch(CartItems(userObj.username))
      toast.success('Item removed from cart')
    } catch (err) {
      toast.error('Failed to remove item')
    }
  }

  useEffect(() => {
    handlePrice()
  }, [products])

  useEffect(() => {
    if (isuserSuccess === false) {
      navigate('/login')
    }
  }, [isuserSuccess, navigate])

  const handleCheckout = () => {
    if (products.length === 0) return

    // Validate address before checkout
    if (!userObj.address) {
      toast.error('Please set a delivery address in your profile first!', {
        icon: '📍',
        duration: 4000,
      })
      navigate('/user-dashboard/profile')
      return
    }

    const orderObj = {
      username: userObj.username,
      items: products,
      totalAmount: price + 50,
      deliveryAddress: userObj.address, // Attach the saved address to the order
      orderDate: new Date(),
    }

    dispatch(createOrder(orderObj))
      .unwrap()
      .then(() => {
        // Force clear cart in state immediately
        dispatch(clearCartItems())

        toast.success(
          'Order placed successfully! Redirecting to your history...',
          {
            icon: '🛍️',
            duration: 4000,
          },
        )
        setTimeout(() => {
          navigate('/user-dashboard/orders')
        }, 2000)
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to place order. Please try again.')
      })
  }

  return (
    <div className="cart-container container py-5">
      {isuserSuccess === true && (
        <div className="row g-5">
          <div className="col-lg-8">
            <h2 className="section-title text-start mb-4">Cart Selection</h2>
            <div className="cart-items-section mb-5">
              {products.length > 0 ? (
                products.map((item) => (
                  <CartCard
                    key={item._id}
                    item={item}
                    handleChange={handleChange}
                    handleRemove={handleRemove}
                  />
                ))
              ) : (
                <div className="empty-cart animate__animated animate__fadeIn py-5">
                  <h2 className="text-gold mb-4">
                    Your cart is currently empty
                  </h2>
                  <Button
                    className="btn-premium px-4 py-2"
                    onClick={() => navigate('/products')}
                  >
                    Explore Menu
                  </Button>
                </div>
              )}
            </div>

            {/* Delivery Address Section (Visible only when cart has items) */}
            {products.length > 0 && (
              <div className="delivery-summary-section animate__animated animate__fadeInUp">
                <h4 className="text-gold mb-3 d-flex align-items-center">
                  <FaTruck className="me-2 text-gold" /> Delivery Destination
                </h4>
                <div className="glass-card p-4 border-gold border-opacity-10">
                  {userObj?.address ? (
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-white mb-2">
                          {userObj?.username || 'User'}'s Residence
                        </h6>
                        <p className="text-muted small mb-0">
                          {userObj.address.street}
                        </p>
                        <p className="text-muted small mb-0">
                          {userObj.address.city}, {userObj.address.pincode}
                        </p>
                        <p className="text-gold small mt-2 fw-bold">
                          {userObj.address.phone}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <p className="text-danger small mb-3">
                        ⚠️ No delivery address found in your profile
                      </p>
                      <Button
                        className="btn-premium btn-sm"
                        onClick={() => navigate('/user-dashboard/profile')}
                      >
                        Add Address to Order
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="col-lg-4">
              <div
                className="cart-summary animate__animated animate__fadeInRight sticky-top"
                style={{ top: '100px' }}
              >
                <h3 className="summary-title border-bottom border-gold border-opacity-10 pb-3">
                  Review Order
                </h3>
                <div className="summary-item">
                  <span>Items ({products.length})</span>
                  <span className="text-white">Rs. {price}</span>
                </div>
                <div className="summary-item">
                  <span>Est. Delivery</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="summary-item">
                  <span>Packaging & Fees</span>
                  <span className="text-white">Rs. 50</span>
                </div>

                <div className="total-price-row mt-4 pt-3 border-top border-gold border-opacity-20 d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">Total Payable</span>
                  <span className="h4 text-gold mb-0 fw-bold">
                    Rs. {price + 50}
                  </span>
                </div>

                <Button
                  className="btn-premium w-100 mt-4 py-3 fw-bold ls-1"
                  onClick={handleCheckout}
                >
                  Pay & Place Order
                </Button>

                <div className="mt-4 p-3 glass-card bg-opacity-10 border-0 rounded text-center">
                  <p className="text-muted small mb-0">
                    💳 Secure checkout with 256-bit encryption. All orders are
                    subject to our terms of service.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Cart
