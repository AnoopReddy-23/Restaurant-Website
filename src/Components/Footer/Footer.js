import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <footer className="bg-dark text-center">
        <div className="wrapper mt-3">
            <div className='box-container row'>
            <div className='box col-6'>
                <h3 className='mt-3'>Contact Info</h3>
                <ul className='list '>
                    <li className='mb-1'><a href="#">+123-456-7890</a></li>
                    <li className='mb-1'><a href="#">+111-422-7890</a></li>
                    <li className='mb-1'><a href="#">abc@gmail.com</a></li>
                    <li className='mb-1'> <a href="#">edfg@gmail.com</a></li>
                    <li className='mb-1'><a href="#">Hyderabad, India - 500070</a></li>
                </ul>
            </div>
            <div className='box col-6'>
                <h3 className='mt-3'>Follow Us On</h3>
                <ul className='list'>
                    <li className='mb-1'><a href="#">facebook</a></li>
                    <li className='mb-1'><a href="#">Twitter</a></li>
                    <li className='mb-1'><a href="#">Instagram</a></li>
                    <li className='mb-1'><a href="#">Linkedin</a></li>
                    <li className='mb-1'><a href="#">Instagram</a></li>
                </ul>
            </div>
            </div>
            <div className="credit">copyright @ 2022 by <span>Mr.Web designer</span></div>
          </div>
      </footer>
    </div>
  )
}

export default Footer