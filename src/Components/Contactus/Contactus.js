import React from 'react'
import {BsFillTelephoneInboundFill} from 'react-icons/bs'
import {BiMap} from 'react-icons/bi'
import {MdOutlineEmail} from 'react-icons/md'
import {Form,Button} from 'react-bootstrap'
import './Contactus.css'
import {useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'

function Contactus() {
  const {register, handleSubmit,formState:{errors}}=useForm();
  const onFormSubmit=(data)=>{
    toast.success("Message sent! Our concierge will reach out to you shortly.", {
        duration: 5000,
        icon: '📨'
    })
    console.log(data)
  }

  return (
    <div className='auth-container' style={{ flexDirection: 'column', gap: '4rem' }}>
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          <h1 className="display-3 text-gold">Get In Touch</h1>
          <p className="text-muted letter-spacing-2">We'd love to hear from you — questions, feedback, or catering inquiries</p>
        </div>

        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
                <div className="contact-info-list d-flex flex-column gap-4">
                    <div className="glass-card p-4 d-flex align-items-center gap-4 animate__animated animate__fadeInLeft">
                        <div className="icon-circle bg-gold text-dark fs-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                            <BiMap/>
                        </div>
                        <div>
                            <h3 className="text-gold mb-1">Our Location</h3>
                            <p className="text-main mb-0">Plot 42, Jubilee Hills, Hyderabad – 500033</p>
                        </div>
                    </div>

                    <div className="glass-card p-4 d-flex align-items-center gap-4 animate__animated animate__fadeInLeft animate__delay-1s">
                        <div className="icon-circle bg-gold text-dark fs-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                            <BsFillTelephoneInboundFill/>
                        </div>
                        <div>
                            <h3 className="text-gold mb-1">Phone Number</h3>
                            <p className="text-main mb-0">+91 40 2354 6789</p>
                        </div>
                    </div>

                    <div className="glass-card p-4 d-flex align-items-center gap-4 animate__animated animate__fadeInLeft animate__delay-2s">
                        <div className="icon-circle bg-gold text-dark fs-4 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                            <MdOutlineEmail/>
                        </div>
                        <div>
                            <h3 className="text-gold mb-1">Email Address</h3>
                            <p className="text-main mb-0">concierge@tastynest.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-7">
                <div className="glass-card p-5 animate__animated animate__fadeInRight">
                    <h2 className="text-gold mb-4">Send us a Message</h2>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                      <Form.Group className="mb-4">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Name" {...register("name", { required: true })}/>
                      </Form.Group>

                      <Form.Group className="mb-4" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="email@example.com" {...register("email", { required: true })}/>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Your Message</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="How can we help you today?" {...register("message", { required: true })}/>
                      </Form.Group>

                      <Button className="btn-premium w-100 py-3" type="submit">
                        Send Message
                      </Button>
                    </Form>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Contactus