import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'



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

    const handleClick=(item)=>{
        console.log(item)
    }


  return (
    <div>
      
      <div className='mt-5 row'>
        {
          products.map((item)=><Card key={item._id} item={item} handleClick={handleClick}/>
        )}
      </div>

    </div>
  )
}

export default Viewproducts