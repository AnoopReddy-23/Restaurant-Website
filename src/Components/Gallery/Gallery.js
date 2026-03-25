import React from 'react'
import {data} from '../GalleryImages'
import './Gallery.css'

function Gallery() {
  return (
    <div className='container py-5 mt-5'>
        <div className="text-center mb-5 animate__animated animate__fadeIn">
            <h2 className="section-title text-gold mt-5">The Visual Essence</h2>
            <p className="text-muted letter-spacing-2 text-uppercase small">A journey through our culinary artistry and curated atmosphere</p>
        </div>
        
        <div className="gallery-grid">
            {data.map((item, index) => (
                <div key={index} className="gallery-card animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="gallery-img-wrapper">
                        <img src={item.img} alt={item.text} />
                    </div>
                    <div className="gallery-card-overlay">
                        <h3>{item.text}</h3>
                        <p>Experience the texture and taste of our signature {item.text.toLowerCase()}.</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Gallery