import React, { useState } from 'react'
import './Cards.css'
import ProductModel from '../ProductModel/ProductModel'
import { FaPlus, FaEye, FaStar } from 'react-icons/fa'

function Cards({ item, handleClick }) {
  const [modalShow, setModalShow] = useState(false)

  // Prioritize real data from DB, with mock fallbacks for legacy items
  const isVeg = item.isVeg !== undefined ? (item.isVeg === true || item.isVeg === 'true') : ['drinks', 'desert', 'snacks'].includes(item.foodType)
  const isBestSeller = item.isBestSeller !== undefined ? (item.isBestSeller === true || item.isBestSeller === 'true') : (item.food.length % 3 === 0)
  const rating = item.rating || (4.5 + (item.food.length % 5) * 0.1).toFixed(1)

  return (
    <div className="cards shadow-premium">
      <div className="image-container">
        <img src={item.foodImg} alt={item.food} />
        <div className="card-badges">
          <span className="badge-tag">{item.foodType}</span>
          {isBestSeller && <span className="best-seller-badge">Best Seller</span>}
        </div>
        <div className={`diet-indicator ${isVeg ? 'veg' : 'non-veg'}`}>
          <div className="diet-dot"></div>
        </div>
      </div>

      <div className="body-content">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="mb-0">{item.food}</h3>
          <div className="rating-tag">
            <FaStar className="me-1" size={12} />
            <span>{rating}</span>
          </div>
        </div>
        <p className="description">
          {item.description ||
            "Indulge in our chef's special creation, prepared with the finest ingredients and culinary expertise."}
        </p>

        <div className="footer-section">
          <span className="price">Rs. {item.cost}</span>
          <div className="d-flex gap-2">
            <button
              className="add-btn"
              title="View Details"
              onClick={() => setModalShow(true)}
            >
              <FaEye size={14} />
            </button>
            <button
              className="add-btn"
              title="Add to Cart"
              onClick={() => handleClick(item)}
            >
              <FaPlus size={14} />
            </button>
          </div>
        </div>
      </div>

      <ProductModel
        item={item}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleClick={handleClick}
      />
    </div>
  )
}

export default Cards