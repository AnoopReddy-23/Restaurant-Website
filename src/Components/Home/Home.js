import React from 'react'
import './Home.css'
import {Button} from 'react-bootstrap'
import { useNavigate } from 'react-router'

function Home() {

  let navigate=useNavigate()

  return (
    <div className='home'>
      <div className="header">
          <div className="overlay">
            <div className="content">
              <h1>Welcome to <br /><span>TastyNest</span></h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, expedita quisquam? Maxime hic, 
                ipsa qui tenetur quo fugiat doloribus iusto.</p>
              <Button onClick={()=>navigate('/login')}>Order Now</Button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home;