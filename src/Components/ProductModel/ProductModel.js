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
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title id="contained-modal-title-vcenter" className="text-gold display-6">
                    {props.item.food}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 pt-0">
                <div className="row g-4 align-items-center">
                    <div className="col-lg-5">
                        <div className="modal-img-wrapper glass-card p-2">
                             <img src={props.item.foodImg} alt={props.item.food} className='img-fluid rounded' />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="ps-lg-3">
                            <span className="badge-tag mb-3 d-inline-block position-static">{props.item.foodType}</span>
                            <h2 className="text-gold mb-3 h1">Rs. {props.item.cost}</h2>
                            <p className="description text-muted mb-4 fs-5">{props.item.description || "Indulge in our chef's special creation, prepared with the finest ingredients and culinary expertise."}</p>
                            
                            <div className="d-flex gap-3">
                                <Button className="btn-premium flex-grow-1 py-3" onClick={()=>props.handleClick(props.item)}>
                                    Add to Cart
                                </Button>
                                <Button variant="outline-light" className="px-4" onClick={props.onHide}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default ProductModel