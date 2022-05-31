import React from 'react'
import {Card,Button} from 'react-bootstrap'

function CartCard({item, handleChange, handleRemove}) {

  
  return (
    <>
      <Card className='mx-4 mt-3'>
        <Card.Body className='row'>
          <div className="col-4 mx-auto">
            <Card.Img variant="top" src={item.foodImg}  className='w-50 rounded d-block mx-auto ' />
          </div>
          <div className="col-4 mx-auto">
            <Card.Title>{item.food}</Card.Title>
            <Card.Title>Rs. {item.cost}</Card.Title>
            <Card.Title>{item.foodType}</Card.Title>
          </div>
          <div className="col-4 mx-auto ">
            <Button className='m-2 bg-success' onClick={()=>handleChange(item,1)}>+</Button>
            <Button className='m-2'>{item.count}</Button>
            <Button className='m-2 bg-warning' onClick={()=>handleChange(item,-1)}>-</Button>
            <br />
            <Button className='p-2 bg-danger' onClick={()=>handleRemove(item.food)}>Remove</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CartCard;