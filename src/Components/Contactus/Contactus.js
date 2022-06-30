import React from 'react'
import logo from '../../images/logo3.jpg'
import branches from '../../images/branches.jpg'
import {BsFillTelephoneInboundFill} from 'react-icons/bs'
import {BiMap} from 'react-icons/bi'
import {MdOutlineEmail} from 'react-icons/md'
import {Form,Button} from 'react-bootstrap'
import './Contactus.css'
import {useForm} from 'react-hook-form'


function Contactus() {

  const {register, handleSubmit,formState:{errors}}=useForm();
  //submit the form
  const onFormSubmit=(data)=>{
    console.log(data)
  }

  return (
    <>
      <div className="contact">

        <div className="content">
          <h2>Contact Us</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Suscipit, voluptates quisquam. Dignissimos ratione doloremque quidem rem numquam, quaerat doloribus possimus!
          </p>
        </div>

        <div className="container">

          <div className="contactInfo">
            <div className="box"> 
              <div className="icon"><BiMap/></div>
              <div className="text">
                <h3>Address</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="box"> 
              <div className="icon"><BsFillTelephoneInboundFill/></div>
              <div className="text">
                <h3>phone no.</h3>
                <p>1234567890</p>
              </div>
            </div>
            <div className="box"> 
              <div className="icon"><MdOutlineEmail/></div>
              <div className="text">
                <h3>Email</h3>
                <p>anoop@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="contactForm">
            <Form onSubmit={handleSubmit(onFormSubmit)}>
              <h2>Send Message</h2>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Full Name" {...register("name", { required: true })}/>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type Your Message</Form.Label>
                <Form.Control as="textarea" rows={3} {...register("message", { required: true })}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Contactus