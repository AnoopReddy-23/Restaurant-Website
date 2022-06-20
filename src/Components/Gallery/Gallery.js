import React from 'react'
import {Carousel} from 'react-bootstrap'
import {data} from '../GalleryImages'


function Gallery() {
  return (
    <div className='mt-4 p-5 gallery'>
        <Carousel fade variant="dark">
          {
            data.map((item)=><Carousel.Item interval={2500}>
            <img
              className="d-block mx-auto w-100"
              src={item.img}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className='text-info'>Cute Little Kids dressed in the form of food items!!</h3>
            </Carousel.Caption>
        </Carousel.Item>
        )}
        </Carousel> 
    </div>
  )
}

export default Gallery