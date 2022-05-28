import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import {MdLogin} from 'react-icons/md'
import login from '../../images/login.svg'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {userLogin} from '../../Slices/userSlics'

function Login() {

  const {register, handleSubmit,formState:{errors}}=useForm();
  
  //get state from store
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)

  //get dispatch function
  let dispatch=useDispatch()

  //get navigate function
  let navigate=useNavigate()

  //state
  let [sample,setSample]=useState(null)
  
  //submit the form
  const onFormSubmit=(userCredObj)=>{
    // console.log(userCredObj)
    if (userCredObj.userType === "user") {
      setSample("user");
      dispatch(userLogin(userCredObj));
    }

    if (userCredObj.userType === "admin") {
      setSample("admin")
      //alert("Admin devoloplment in progress...");
      dispatch(userLogin(userCredObj));
    }
  }

  //this to be executed when either isSuccess or isError changed
  useEffect(()=>{
    if(isSuccess && sample==="user"){
        //console.log(sample);
        navigate("/userdashboard");
    }
    if(isSuccess && sample==="admin"){
      //console.log(sample);
      navigate("/admindashboard");
  }
  }, [isSuccess, isError]);

  return (
    <div>
      <h1 className='text-warning text-center'>Login</h1>
      <img src={login} alt="login image" width="300px" className='d-block mx-auto border border-2 border-light p-3 m-3'/>
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 mx-auto">
          <Form onSubmit={handleSubmit(onFormSubmit)}>

            {/* usertype */}
            <Form.Group className="mb-3">
              {/* Normal user */}
              <Form.Label>Select type of User</Form.Label> <br />
                <Form.Check inline type="radio" id="user">
                  <Form.Check.Input type="radio" value="user" {...register("userType", { required: true })} />
                <Form.Check.Label>User</Form.Check.Label>
              </Form.Check>
              {/* Admin */}
              <Form.Check inline type="radio" id="admin">
                <Form.Check.Input type="radio" value="admin" {...register("userType", { required: true })}/>
                <Form.Check.Label>Admin</Form.Check.Label>
              </Form.Check>
               {/* validation error message for userType */}
               {errors.userType && <p className='text-danger'>*UserType is required</p>}
            </Form.Group>

            {/* username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" {...register("username",{required:true})} />
              {/* validation error message for username */}
              {errors.username && <p className='text-danger'>*Username is required</p>}
            </Form.Group>

            {/* password */}
            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("password",{required:true})} />
              {/* validation error message for password */}
              {errors.password && <p className='text-danger'>*Password is required</p>}
            </Form.Group>
            
            {/* submit button */}
            <Button variant="primary" type="submit">
              Login <MdLogin />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login