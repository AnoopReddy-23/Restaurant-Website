import React from 'react'
import {Card,Button} from 'react-bootstrap'

function CartCard({item, handleChange, handleRemove}) {

  
  return (
    <>
      <Card className='mx-4 mt-3'>
        <Card.Body className='row'>
          <div className="col-md-4 mx-auto">
            <Card.Img variant="top" src={item.foodImg}  className='w-50 rounded d-block mx-auto ' />
          </div>
          <div className="col-md-4 mx-auto text-center">
            <Card.Text>{item.food}</Card.Text>
            <Card.Text>Rs. {item.cost}</Card.Text>
            {/* <Card.Text>{item.foodType}</Card.Text> */}
          </div>
          <div className="col-md-4 mx-auto text-center">
            <Button className='bg-success' onClick={()=>handleChange(item,1)}>+</Button>
            <Button className='m-1'>{item.count}</Button>
            <Button className='bg-warning' onClick={()=>handleChange(item,-1)}>-</Button>
            <br />
            <Button className='p-2 bg-danger' onClick={()=>handleRemove(item._id)}>Remove</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CartCard;