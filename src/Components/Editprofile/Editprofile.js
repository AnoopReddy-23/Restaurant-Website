import React from 'react'
import {Card,Button,Toast,ToastContainer} from 'react-bootstrap'


function Editprofile({show,setShow}) {
  return (
    <div  aria-live="polite"
    aria-atomic="true"
    className="bg-dark position-relative"
    style={{ minHeight: '240px' }}
    >
        <ToastContainer position='middle-center' className="p-3">
        <Toast onClose={() => setShow(false)} show={show}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
  )
}

export default Editprofile


//Work on navbar after login and then swiper for menu and edit profile.
