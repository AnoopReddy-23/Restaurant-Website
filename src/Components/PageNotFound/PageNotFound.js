import React from 'react'
import { useNavigate } from 'react-router'
import {Button} from 'react-bootstrap'
import './PageNotFound.css'

function PageNotFound() {

    let navigate=useNavigate();

  return (
    <div className='pagenotfound p-5'>
        <div className="container-fluid p-5">
        <div className="notfound">
            <h1>Error-404 : Page not Found</h1>
        </div>
        <h3 className='mt-3'>We are sorry! The page you are looking for is not found!</h3>
        <Button onClick={()=>navigate("/")} className='mt-3 p-3' variant='outline-warning'>Back to Home</Button>
        </div>
    </div>
  )
}

export default PageNotFound