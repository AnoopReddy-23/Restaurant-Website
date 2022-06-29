import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
import {Nav,Navbar,Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import './Viewproducts.css'
import { useSelector,useDispatch } from 'react-redux'
import {getProducts} from '../../Slices/productSlice'
import {CartItems} from '../../Slices/cartSlice'


function Viewproducts() {
    //products from store  
    let {products,isError,isSuccess,errMsg}=useSelector(state=>state.product)
    //userObj from store
    let {userObj,isuserSuccess} = useSelector(state=>state.user)

    //dispatch fun
    let dispatch=useDispatch()
    let navigate=useNavigate()

    let [starters,setStarters]=useState([])
    let [riceAndBiryani,setRiceAndBiryani]=useState([])
    let [snacks,setSnacks]=useState([])
    let [drinks,setDrinks]=useState([])
    let [desert,setDesert]=useState([])
    let newArray;
    
    useEffect(()=>{
        dispatch(getProducts());
        dispatch(CartItems(userObj.username));
    },[])

    //this to be executed when either isSuccess or isError changed
      useEffect(()=>{
        if(isError){
          alert(errMsg)
        }
        if(isSuccess){
          //console.log(products)
          newArray= products.filter((item=> item.foodType==="starters"))
          setStarters(newArray)
          newArray= products.filter((item=> item.foodType==="riceAndBiryani"))
          setRiceAndBiryani(newArray)
          newArray= products.filter((item=> item.foodType==="snacks"))
          setSnacks(newArray)
          newArray= products.filter((item=> item.foodType==="drinks"))
          setDrinks(newArray)
          newArray= products.filter((item=> item.foodType==="desert"))
          setDesert(newArray)
        }
      }, [isSuccess, isError]);


    const handleClick=(item)=>{
      //cartSlice
      dispatch(CartItems(userObj.username));

        //console.log(item)
        //console.log(Object.isExtensible(item))
        //setCartItem(item)

        const obj={
          ...item
        };
        
        //adding username to the item
        obj.username=userObj.username

        //count of obj
        obj.count=1

        // delete id
        delete obj._id;
        delete obj.foodType;
        delete obj.description
        //console.log(obj)
        
        //console.log(item,obj)
        // http post req
        axios.post('http://localhost:4000/cart-api/create-cart',obj)
        .then(response=>{
          alert(response.data.message)
          //cartSlice
          dispatch(CartItems(userObj.username));
        })
        .catch(error=>alert(error))
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
        <div className='text-center'>
          <div className="row ">
              <div className="menu">
                <Navbar className='col-5 col-md-4 col-lg-3 ms-auto' bg="info" expand="false" fixed='bottom'>
                  <Container>
                    <Navbar.Brand href='#' className='text-end'>Menu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="ms-auto">
                        <Nav.Item>
                          <Nav.Link eventKey={1}  href='#starters'>Starters</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={2}  href="#riceAndBiryani">Rice and Biryani</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={3}  href="#snacks">Snacks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={4}  href="#drinks">Drinks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={5}  href="#deserts">Deserts</Nav.Link>
                        </Nav.Item>
                          
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              </div>
          </div>

          <div className="menu-items">
                {/* starters */}
              <div className='mt-5 row'>
                <h1 className='food' id='starters'>
                  <span>Starters</span>
                  </h1>
                {
                  starters.map((item)=>
                    <div className='mx-auto col-12 col-md-6 col-lg-4 container-fluid'>
                      <Card key={item._id} item={item} handleClick={handleClick}/>
                    </div>
                )}
              </div>

              {/* rice and biryani */}
              <div className='mt-5 row'>
                <h1 className='food' id='riceAndBiryani'>
                  <span>Rice and Biryani</span>
                </h1>
                {
                  riceAndBiryani.map((item)=>
                    <div className='mx-auto col-10 col-md-5 col-lg-4 '>
                      <Card key={item._id} item={item} handleClick={handleClick}/>
                    </div>
                )}
              </div>

              {/* snacks */}
              <div className='mt-5 row'>
                <h1 className='food' id='snacks'>
                  <span>Snacks</span>
                </h1>
                {
                  snacks.map((item)=>
                    <div className='mx-auto col-10 col-md-5 col-lg-4 '>
                      <Card key={item._id} item={item} handleClick={handleClick}/>
                    </div>
                )}
              </div>

              {/* drinks */}
              <div className='mt-5 row'>
                <h1 className='food' id='drinks'>
                  <span>Drinks</span>
                </h1>
                {
                  drinks.map((item)=>
                    <div className='mx-auto col-10 col-md-5 col-lg-4 '>
                      <Card key={item._id} item={item} handleClick={handleClick}/>
                    </div>
                )}
              </div>

              {/* deserts */}
              <div className='mt-5 row'>
                <h1 className='food' id='deserts'>
                  <span>Deserts</span>
                </h1>
                {
                  desert.map((item)=>
                    <div className='mx-auto col-10 col-md-5 col-lg-4 '>
                      <Card key={item._id} item={item} handleClick={handleClick}/>
                    </div>
                )}
              </div>

          </div>
          
          </div>
      </>)
    }
    </>
  )
}

export default Viewproducts