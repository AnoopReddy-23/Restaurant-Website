import React from 'react'
import './CartCard.css'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'

function CartCard({ item, handleChange, handleRemove }) {
  return (
    <div className="cart-card animate__animated animate__fadeInLeft">
      <img src={item.foodImg} alt={item.food} className="cart-card-img" />

      <div className="cart-card-info">
        <h3>{item.food}</h3>
        <p className="text-gold mb-0">Premium Selection</p>
        <span className="text-gold font-weight-bold">Rs. {item.cost}</span>
      </div>

      <div className="quantity-controls">
        <button className="qty-btn" onClick={() => handleChange(item, -1)}>
          <FaMinus size={12} />
        </button>
        <span className="qty-value text-gold">{item.count}</span>
        <button className="qty-btn" onClick={() => handleChange(item, 1)}>
          <FaPlus size={12} />
        </button>
      </div>

      <div className="item-subtotal mx-4">
        <span className="text-gold fw-bold">Rs. {item.count * item.cost}</span>
      </div>

      <button className="remove-btn" onClick={() => handleRemove(item._id)}>
        <FaTrash />
      </button>
    </div>
  )
}

export default CartCard
