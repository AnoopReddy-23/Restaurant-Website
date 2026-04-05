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
            Crafting Extraordinary Culinary Experiences
          </p>
          <Button className="btn-premium" onClick={() => navigate('/login')}>
            Discover Menu
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
                At TastyNest, we believe that dining is more than just a
                meal—it's a journey of the senses. Our chefs combine traditional
                techniques with modern culinary innovation to bring you flavors
                that are as bold as they are refined.
              </p>
              <p className="text-muted">
                Every dish is prepared with passion, using only the finest
                seasonal ingredients sourced directly from local producers to
                ensure a truly authentic gourmet experience.
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
              { img: home1, title: "Chef's Tasting Menu", desc: "A beautifully curated 7-course journey of our most celebrated and vibrant flavors." },
              { img: home2, title: "Wood-Fired Specialties", desc: "Artisanal cuts and seasonal vegetables kissed by signature aromatic oak smoke." },
              { img: home3, title: "Gourmet Appetizers", desc: "Delicate, handcrafted beginnings designed to perfectly awaken your palate." },
              { img: home4, title: "Decadent Desserts", desc: "Exquisite sweet finales prepared daily by our master pastry artisans." },
              { img: home5, title: "Signature Cocktails", desc: "Award-winning mixology blending fresh botanicals and premium imported spirits." }
            ].map((item, index) => (
              <SwiperSlide key={index} style={{ width: '350px' }}>
                <div className="dish-card">
                  <div className="dish-img-container">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="dish-info">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <span className="text-gold font-weight-bold">
                      Premium Selection
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
            Ready to Taste Perfection?
          </h2>
          <p className="lead text-main mb-5">
            Join us for an unforgettable evening of fine dining and exceptional
            service.
          </p>
          <Button className="btn-premium" onClick={() => navigate('/login')}>
            Reserve Your Table
          </Button>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title text-gold">Atmosphere & Art</h2>
          <div className="gallery-grid">
            {[
              { img: home6, tag: "Intimate Dining" },
              { img: home7, tag: "The Wine Cellar" },
              { img: home8, tag: "Private Events" },
              { img: home5, tag: "Chef's Table" },
              { img: home2, tag: "Ambient Lighting" },
              { img: home3, tag: "Gourmet Plating" }
            ].map((item, i) => (
              <div className="gallery-item" key={i}>
                <img src={item.img} alt={item.tag} />
                <div className="gallery-overlay">
                  <span className="text-primary font-weight-bold">
                    {item.tag}
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
