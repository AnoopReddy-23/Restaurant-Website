import React from 'react'
import './Home.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import slider1 from '../../images/slider1.jpg'
import homeImg from '../../images/home.jpg'
import home1 from '../../images/home1.jpg'
import home2 from '../../images/home2.jpg'
import home3 from '../../images/home3.jpg'
import home4 from '../../images/home4.jpg'
import home5 from '../../images/home5.jpg'
import home6 from '../../images/home6.jpg'
import home7 from '../../images/home7.jpg'
import home8 from '../../images/home8.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Mousewheel,
} from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Mousewheel])

function Home() {
  let navigate = useNavigate()

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${slider1})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animate__animated animate__fadeInDown">TastyNest</h1>
          <p className="animate__animated animate__fadeInUp">
            Where Tradition Meets Modern Gastronomy
          </p>
          <Button className="btn-premium" onClick={() => navigate('/products')}>
            Explore Our Menu
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-5">
        <div className="container p-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src={homeImg}
                alt="About Us"
                className="img-fluid rounded shadow glass-card p-2"
              />
            </div>
            <div className="col-lg-6 px-lg-5">
              <h2 className="section-title text-start text-gold">Our Story</h2>
              <p className="lead text-muted">
                Born from a love for authentic Indian cuisine, TastyNest brings
                together the rich culinary heritage of Hyderabad with contemporary
                dining innovation. Every recipe has been perfected over generations,
                ensuring each bite carries the warmth of tradition.
              </p>
              <p className="text-muted">
                From our slow-cooked Dum Biryanis to our hand-crafted desserts,
                we use only farm-fresh ingredients and time-honored spice blends
                to deliver a dining experience that feels like home—only better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="featured-dishes">
        <div className="container">
          <h2 className="section-title text-gold">Chef's Recommendations</h2>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            mousewheel={true}
            className="mySwiper py-5"
          >
            {[
              { img: home1, name: 'Hyderabadi Dum Biryani', desc: 'Slow-cooked with 24 royal spices in a sealed clay pot.', tag: 'Best Seller' },
              { img: home2, name: 'Paneer Butter Masala', desc: 'Cottage cheese simmered in a rich, buttery tomato gravy.', tag: 'Chef\'s Pick' },
              { img: home3, name: 'Chicken Tikka Kebab', desc: 'Clay-oven roasted chicken marinated in aromatic spices.', tag: 'Most Popular' },
              { img: home4, name: 'Royal Gulab Jamun', desc: 'Milk dumplings soaked in fragrant rose and cardamom syrup.', tag: 'Signature Sweet' },
              { img: home5, name: 'Fresh Mango Lassi', desc: 'Chilled Alphonso mango blended with creamy yogurt.', tag: 'Refreshing' },
            ].map((dish, index) => (
              <SwiperSlide key={index} style={{ width: '350px' }}>
                <div className="dish-card">
                  <div className="dish-img-container">
                    <img src={dish.img} alt={dish.name} />
                  </div>
                  <div className="dish-info">
                    <h3>{dish.name}</h3>
                    <p>{dish.desc}</p>
                    <span className="text-gold font-weight-bold">
                      {dish.tag}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Luxury Call to Action */}
      <section className="luxury-banner">
        <div className="container">
          <h2 className="display-4 text-gold mb-4">
            Your Table Awaits
          </h2>
          <p className="lead text-main mb-5">
            Experience the finest flavors of India. Sign in to explore our
            curated menu, place orders, and enjoy doorstep delivery.
          </p>
          <Button className="btn-premium" onClick={() => navigate('/products')}>
            Order Now
          </Button>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-gold">Atmosphere & Art</h2>
          <div className="gallery-grid">
            {[home6, home7, home8, home5, home2, home3].map((img, i) => (
              <div className="gallery-item" key={i}>
                <img src={img} alt="Gallery" />
                <div className="gallery-overlay">
                  <span className="text-primary font-weight-bold">
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
