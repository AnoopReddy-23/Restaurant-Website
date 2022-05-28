import React from 'react'
import {Card,Button} from 'react-bootstrap'


function Cards({item,handleClick}) {

  return (
    <div className='mx-auto col-10 col-md-5 col-lg-4'>
        <Card style={{ width: "18rem" }} className='mx-auto mt-5'>
              <Card.Img variant="top" src={item.foodImg} />
                <Card.Body>
                  <Card.Title>{item.food}</Card.Title>
                  <Card.Text><span>Rs.</span>{item.cost}</Card.Text>
                  <Card.Text>{item.foodType}</Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="primary" onClick={()=>handleClick(item)}>ADD TO CART</Button>
              </Card.Body>
            </Card>
    </div>
  )
}

export default Cards