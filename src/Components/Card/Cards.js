import React, {useState} from 'react'
import {Card,Button} from 'react-bootstrap'
import './Card.css'
import ProductModel from '../ProductModel/ProductModel'

function Cards({ item, handleClick }) {

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className='menu-item'>
        <Card style={{ width: "20rem" }} className='mx-auto mt-3 py-3 card text-center'>
                  <Card.Body className='card-body'>
                    <Card.Img src={item.foodImg} className='card-img'/>
                    <Card.Title className='mt-3 card-title h1'>{item.food}</Card.Title>
                    <Card.Text className='card-price h1'><span>Rs.</span>{item.cost}</Card.Text>
                    <Card.Text className='card-type h2'>{item.foodType}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted card-footer">
                    <Button className='card-button d-block mx-auto' variant="primary" onClick={()=>setModalShow(true)}>View Product</Button>
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