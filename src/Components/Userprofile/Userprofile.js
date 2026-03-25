import React,{useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaChevronLeft } from 'react-icons/fa'

function Userprofile() {
  let {userObj,isSuccess: isuserSuccess}=useSelector(state=>state.user);
  let navigate=useNavigate()

  useEffect(()=>{
    if(isuserSuccess===false){
      navigate('/login')
    }
  },[isuserSuccess])

  return (
    <div className="container py-5 min-vh-100">
      {isuserSuccess && (
        <div className="row justify-content-center pt-5">
            <div className="col-lg-6">
                <Button onClick={() => navigate("/products")} className="btn-premium btn-sm mb-4 bg-transparent border-gold text-gold">
                    <FaChevronLeft className="me-2"/> Back to Menu
                </Button>
                
                <div className="glass-card p-5 text-center animate__animated animate__zoomIn">
                    <div className="position-relative d-inline-block mb-4">
                        <img 
                          src={userObj.profileImg} 
                          alt="Profile" 
                          className="rounded-circle shadow-xl border border-gold" 
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <div className="position-absolute bottom-0 end-0 bg-gold p-2 rounded-circle shadow">
                            <FaUserEdit className="text-dark"/>
                        </div>
                    </div>
                    
                    <h1 className="display-5 text-gold mb-2">{userObj.username}</h1>
                    <p className="text-muted text-uppercase letter-spacing-2 mb-4">Valued Member</p>
                    
                    <div className="row g-3 text-start mt-4">
                        <div className="col-12 p-3 glass-card mb-2">
                            <span className="text-main small d-block">Email Address</span>
                            <span className="text-gold">{userObj.email}</span>
                        </div>
                        <div className="col-12 p-3 glass-card">
                            <span className="text-main small d-block">Primary Location</span>
                            <span className="text-gold">{userObj.city || "Not specified"}</span>
                        </div>
                    </div>
                    
                    <Button className="btn-premium mt-5 px-5">Edit Profile</Button>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default Userprofile