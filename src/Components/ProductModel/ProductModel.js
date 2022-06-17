import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import './ProductModel.css'

function ProductModel(props) {
  return (
    <>
        <Modal 
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.item.food}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className="row">
                    <div className="col-10 col-lg-5 mx-auto">
                        <img src={props.item.foodImg} alt="" className='w-100 d-block mx-auto align-self-center' />
                    </div>
                    <div className="col-10 col-lg-7 mx-auto">
                        <h2><span>Rs.</span>{props.item.cost}</h2>
                        <h2>{props.item.foodType}</h2>
                        <p className="lead">{props.item.description}</p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={()=>props.handleClick(props.item)}>ADD TO CART</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ProductModel