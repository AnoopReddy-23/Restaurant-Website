import React, {useState} from 'react'
import {Card,Button} from 'react-bootstrap'
//import './Card.css'
import ProductModel from '../ProductModel/ProductModel'

function Cards({ item, handleClick }) {

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
        <Card style={{ width: "18rem" }} className='mx-auto mt-5 card'>
                  <Card.Body className='card-body'>
                    <Card.Img src={item.foodImg} className='card-img'/>
                    <Card.Title>{item.food}</Card.Title>
                    <Card.Text><span>Rs.</span>{item.cost}</Card.Text>
                    <Card.Text>{item.foodType}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Button variant="primary" onClick={()=>setModalShow(true)}>View Product</Button>
                </Card.Footer>
        </Card>

      <ProductModel
        item={item}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleClick={handleClick}
        />
    </div>
  )
}

export default Cards