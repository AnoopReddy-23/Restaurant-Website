import {useState,useEffect} from 'react'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'



function Viewproducts() {

    let [products,setProducts]=useState([])
    

  
    useEffect(()=>{
      const fetchProducts=async ()=>{
        let response=await axios.get('/product-api/getproducts')
        let productList=response.data.payload
        setProducts(productList)
      }
      fetchProducts()
    },[])

    


  return (
    <div>
      
      <div className='mt-5 row'>
        {
          products.map((item)=><div key={item._id} className='mx-auto col-10 col-sm-5 col-lg-4'>
            <Card style={{ width: "18rem" }} className='mx-auto mt-5'>
              <Card.Img variant="top" src={item.foodImg} />
                <Card.Body>
                  <Card.Title>{item.food}</Card.Title>
                  <Card.Text>Rs.{item.cost}</Card.Text>
                  <Card.Text>{item.foodType}</Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="primary">ADD TO CART</Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>

    </div>
  )
}

export default Viewproducts