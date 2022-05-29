import React from 'react'
import {Card,Button} from 'react-bootstrap'

function CartCard({item, handleChange, handleRemove}) {

  
  return (
    <div className='m-3'>
      <Card >
        <Card.Body className='row'>
          <div className="col-4 mx-auto">
            <Card.Img variant="top" src={item.foodImg}  className='w-50 rounded d-block mx-auto ' />
          </div>
          <div className="col-4 mx-auto">
            <Card.Title>{item.food}</Card.Title>
            <Card.Title>{item.cost}</Card.Title>
            <Card.Title>{item.foodType}</Card.Title>
          </div>
          <div className="col-4 mx-auto ">
            <Button onClick={()=>handleChange(item,1)}>+</Button>
            <Button>{item.count}</Button>
            <Button onClick={()=>handleChange(item,-1)}>-</Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button onClick={()=>handleRemove(item._id)}>Remove</Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default CartCard;