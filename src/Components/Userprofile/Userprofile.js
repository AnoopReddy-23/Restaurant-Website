import React,{useEffect} from 'react'
import {Card,Button} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Userprofile() {

  //get userObj from store
  let {userObj,isuserSuccess}=useSelector(state=>state.user);
  //get navigate function
  let navigate=useNavigate()

  let funNavigate=()=>{
      navigate("/products");
  }

  useEffect(()=>{
    if(isuserSuccess===false){
      navigate('/login')
    }
  },[])

  return (
    <>
    {isuserSuccess===false 
      ? (
            alert("Please Login!!! After then you can see your profile.")
      ) 
      : (<>
        <Button onClick={funNavigate} className='m-4 p-3 bg-success'>Back To DashBoard</Button>
        <h1 className='m-4 text-center text-warning'>Profile</h1>
        <Card style={{ width: "18rem" }} className='mx-auto mt-5 '>
          <Card.Img variant="top" src={userObj.profileImg} />
            <Card.Body>
              <Card.Title>{userObj.username}</Card.Title>
              <Card.Text>{userObj.email}</Card.Text>
              <Card.Text>{userObj.city}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Button variant="primary">Edit</Button>
          </Card.Footer>
        </Card>
      </>)
    }
  </>
  )
}

export default Userprofile