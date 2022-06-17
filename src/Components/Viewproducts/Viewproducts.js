import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
import {useSelector} from 'react-redux'
import {Nav,Navbar,Container,Offcanvas} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import './Viewproducts.css'

function Viewproducts() {

    let [products,setProducts]=useState([])
    let [starters,setStarters]=useState([])
    let [riceAndBiryani,setRiceAndBiryani]=useState([])
    let [snacks,setSnacks]=useState([])
    let [drinks,setDrinks]=useState([])
    let [desert,setDesert]=useState([])
    let newArray;
    
    let {userObj} = useSelector(state=>state.user)

    useEffect(()=>{
      const fetchProducts=async ()=>{
        let response=await axios.get('/product-api/getproducts')
        let productList=response.data.payload
        newArray= productList.filter((item=> item.foodType==="starters"))
        setStarters(newArray)
        newArray= productList.filter((item=> item.foodType==="riceAndBiryani"))
        setRiceAndBiryani(newArray)
        newArray= productList.filter((item=> item.foodType==="snacks"))
        setSnacks(newArray)
        newArray= productList.filter((item=> item.foodType==="drinks"))
        setDrinks(newArray)
        newArray= productList.filter((item=> item.foodType==="desert"))
        setDesert(newArray)
      }
      fetchProducts()
    },[])

    const handleClick=(item)=>{
        // console.log(item)
        //setCartItem(item)
        //adding username to the item
        item.username=userObj.username
        //count of item
        item.count=1
        //delete id
        delete item._id;
        //http post req
        axios.post('http://localhost:4000/cart-api/create-cart',item)
        .then(response=>alert(response.data.message))
        .catch(error=>alert(error))
    }


  return (
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
  )
}

export default Viewproducts