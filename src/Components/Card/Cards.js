import React from 'react'
import {Card,Button} from 'react-bootstrap'
import './Card.css'

function Cards({ item, handleClick }) {

  return (
    <div className='mx-auto col-10 col-md-5 col-lg-4 '>
        <Card style={{ width: "18rem" }} className='mx-auto mt-5 card'>
                  <Card.Body className='card-body'>
                    <Card.Img src={item.foodImg} className='card-img'/>
                    <Card.Title>{item.food}</Card.Title>
                    <Card.Text><span>Rs.</span>{item.cost}</Card.Text>
                    <Card.Text>{item.foodType}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button variant="primary" onClick={()=>handleClick(item)}>ADD TO CART</Button>
                </Card.Footer>
        </Card>
    </div>
  )
}

export default Cards