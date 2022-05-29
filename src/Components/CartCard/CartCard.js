import React from 'react'
import {Card,Button} from 'react-bootstrap'

function CartCard({item}) {
  return (
    <div className='m-3'>
      <Card >
        <Card.Body className='row'>
          <div className="col-4 mx-auto">
            <Card.Img variant="top" src={item.foodImg}  className='w-50 rounded d-block mx-auto ' />
          </div>
          <div className="col-8 mx-auto">
            <Card.Title>{item.food}</Card.Title>
            <Card.Title>{item.cost}</Card.Title>
            <Card.Title>{item.foodType}</Card.Title>
            <Button variant="primary">Go somewhere</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CartCard;