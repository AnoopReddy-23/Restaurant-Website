import React,{useEffect} from 'react'
import './Home.css'
import {Button,Carousel} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import slider1 from '../../images/slider1.jpg'
import slider2 from '../../images/slider4.jpg'
import slider3 from '../../images/slider3.jpg'
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
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore,{ Navigation, Pagination, Scrollbar, A11y,EffectCoverflow } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,EffectCoverflow]);


function Home() {

  let navigate=useNavigate()
  

  return (
    <div className='home'>
      {/* part-1 */}
      <div className="head row bg-muted">
        <div className="col-12 col-md-4 heading">
          <h1>TastyNest</h1>
          <h3>We Serve Passion</h3>
        </div>
        <div className="slider col-12 col-md-8">
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slider1}
                alt="First slide"
                style={{ height: "25rem" }}
              />
            </Carousel.Item> 
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slider2}
                alt="First slide"
                style={{ height: "25rem" }}
              />
            </Carousel.Item> 
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slider3}
                alt="First slide"
                style={{ height: "25rem" }}
              />
            </Carousel.Item> 
          </Carousel>
        </div>
      </div>
      <div className="head-2">
        {/* part-2 */}
      <div className="text">
        <p className="lead mt-1 p-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Optio, ab voluptates aliquid et architecto deserunt doloribus, eum quis porro explicabo laborum voluptatem, 
          eaque ipsa.Tenetur ipsam tempora vitae! Sequi, architecto. Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Libero, eaque sequi aspernatur omnis ducimus excepturi ipsum cum ea natus laboriosam.</p>
      </div>
      {/* part-3 */}
      <h1 className="text-center text-warning d-lg-none d-xl-none">Our Restaurant's Top Rated Dishes</h1>
      <div className="body mt-5 p-4 bg-muted">
        <h1 className="text-center text-warning d-none d-lg-block">Our Restaurant's Top Rated Dishes</h1>
        <Swiper
          effect='coverflow' 
          spaceBetween={10}
          breakpoints={{
            1150: { slidesPerView: 3},
            600 : { slidesPerView: 2},
          }}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
          <div className="card p-4 m-5">
            <div className="card-img">
              <img src={home1} alt="" />
              <h3 className="card-title text-danger">Delicious Food</h3>
            </div>
            <div className="card-content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Sequi cupiditate est libero quas vero ullam? Labore iusto
              eligendi quibusdam sed.
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card p-4 m-5">
            <div className="card-img">
              <img src={home2} alt="" />
              <h3 className="card-title text-danger">Delicious Food</h3>
            </div>
            <div className="card-content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Sequi cupiditate est libero quas vero ullam? Labore iusto
              eligendi quibusdam sed.
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card p-4 m-5">
            <div className="card-img">
              <img src={home3} alt="" />
              <h3 className="card-title text-danger">Delicious Food</h3>
            </div>
            <div className="card-content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Sequi cupiditate est libero quas vero ullam? Labore iusto
              eligendi quibusdam sed.
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card p-4 m-5">
            <div className="card-img">
              <img src={home4} alt="" />
              <h3 className="card-title text-danger">Delicious Food</h3>
            </div>
            <div className="card-content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Sequi cupiditate est libero quas vero ullam? Labore iusto
              eligendi quibusdam sed.
            </div>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="card p-4 m-5">
            <div className="card-img">
              <img src={home5} alt="" />
              <h3 className="card-title text-danger">Delicious Food</h3>
            </div>
            <div className="card-content">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Sequi cupiditate est libero quas vero ullam? Labore iusto
              eligendi quibusdam sed.
            </div>
          </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* part-4 */}
      <div className="text m-3">
        <p className="lead p-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Optio, ab voluptates aliquid et architecto deserunt doloribus, eum quis porro explicabo laborum voluptatem, 
          eaque ipsa.Tenetur ipsam tempora vitae! Sequi, architecto. Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Libero, eaque sequi aspernatur omnis ducimus excepturi ipsum cum ea natus laboriosam.</p>
      </div>
      {/* part-5 */}
      <div className="photos m-4">
      <h1 className="text-center text-warning m-3 p-3"><span>TastyNest</span> Specials</h1>
        <div className="gallery">
          <img src={homeImg} alt="" />
          <img src={home6} alt="" />
          <img src={home7} alt="" />
          <img src={home8} alt="" />
          <img src={home5} alt="" />
        </div>
      </div>

      {/* part-6 */}
      <div className="endpart br-muted text-center my-3">
          <h2>Hungry!! And want to try something tasty and delicious.</h2>
          <h2>TastyNest is the perfect place to order your food. </h2>
          <h2>Click on the below button and order your food.</h2>
          <Button variant='outline-warning m-3 p-3' onClick={()=>navigate('/login')}>Order Now</Button>
      </div>

      </div>
      {/* <div className="headnext mt-3">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis necessitatibus quo illo aliquid dolorum totam?</p>
        <div className="image">
        <img src={homeImg} alt="" width={"300px"} />
      </div>
      </div> */}
    </div>
  )
}

export default Home;