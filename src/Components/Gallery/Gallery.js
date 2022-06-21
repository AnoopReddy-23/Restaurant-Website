import React from 'react'
import {Carousel} from 'react-bootstrap'
import {data} from '../GalleryImages'


function Gallery() {
  return (
    <div className='mt-4 p-5 gallery'>
        <h1 className='text-info text-center'>Cute Little Kids dressed in the form of food items!!</h1>
        <Carousel fade variant="dark">
          {
            data.map((item)=><Carousel.Item interval={2500}>
            <img
              className="d-block mx-auto w-100 image"
              src={item.img}
              alt="First slide"
              style={{ height: "35rem" }}
            />
            <Carousel.Caption className='text-danger'>
              <h1 className='display-3'>{item.text}</h1>
            </Carousel.Caption>
        </Carousel.Item>
        )}
        </Carousel> 
    </div>
  )
}

export default Gallery