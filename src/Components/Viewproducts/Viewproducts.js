import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
import {useSelector} from 'react-redux'


function Viewproducts() {

    let [products,setProducts]=useState([])
    let [cartitem,setCartItem]=useState([])
    
    let {userObj} = useSelector(state=>state.user)

    useEffect(()=>{
      const fetchProducts=async ()=>{
        let response=await axios.get('/product-api/getproducts')
        let productList=response.data.payload
        setProducts(productList)
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
    <>
      
      <div className='mt-5 row'>
        {
          products.map((item)=>
            <div className='mx-auto col-10 col-md-5 col-lg-4 '>
              <Card key={item._id} item={item} handleClick={handleClick}/>
            </div>
        )}
      </div>

    </>
  )
}

export default Viewproducts