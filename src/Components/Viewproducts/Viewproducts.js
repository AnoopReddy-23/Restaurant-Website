import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
import {useNavigate} from 'react-router-dom'
import './Viewproducts.css'
import { useSelector,useDispatch } from 'react-redux'
import {getProducts} from '../../Slices/productSlice'
import {CartItems} from '../../Slices/cartSlice'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

 SwiperCore.use([Navigation, Pagination, Mousewheel]);


import { toast } from 'react-hot-toast'

function Viewproducts() {
    //products from store  
    let {products,isError,isSuccess,errMsg}=useSelector(state=>state.product)
    //userObj from store
    let {userObj,isSuccess: isuserSuccess} = useSelector(state=>state.user)

    //dispatch fun
    let dispatch=useDispatch()
    let navigate=useNavigate()

    let [starters,setStarters]=useState([])
    let [riceAndBiryani,setRiceAndBiryani]=useState([])
    let [snacks,setSnacks]=useState([])
    let [drinks,setDrinks]=useState([])
    let [desert,setDesert]=useState([])
    
    useEffect(()=>{
        dispatch(getProducts());
        if(userObj.username) {
            dispatch(CartItems(userObj.username));
        }
    },[])

    //this to be executed when either isSuccess or isError changed
    useEffect(()=>{
        if(isError){
            console.error(errMsg)
        }
        if(isSuccess && products){
            setStarters(products.filter(item => item.foodType === "starters"))
            setRiceAndBiryani(products.filter(item => item.foodType === "riceAndBiryani"))
            setSnacks(products.filter(item => item.foodType === "snacks"))
            setDrinks(products.filter(item => item.foodType === "drinks"))
            setDesert(products.filter(item => item.foodType === "desert"))
        }
    }, [isSuccess, isError, products]);


    const handleClick=(item)=>{
        const obj={
          ...item,
          username: userObj.username,
          count: 1
        };
        
        delete obj._id;
        delete obj.foodType;
        delete obj.description
        
        axios.post('/cart-api/create-cart',obj)
        .then(response=>{
          toast.success(response.data.message)
          dispatch(CartItems(userObj.username));
        })
        .catch(error=>toast.error("Failed to add to cart"))
    }

    useEffect(()=>{
      if(isuserSuccess===false){
        navigate('/login')
      }
    },[isuserSuccess])


  return (
    <div className='menu-items container-fluid px-lg-5'>
        <h1 className="section-title text-gold mt-3">Our Exquisite Menu</h1>
        
        <div className="menu-categories mb-5 pt-1">
            {[
              { id: 'starters', title: 'Elegant Starters', data: starters },
              { id: 'riceAndBiryani', title: 'Main Course & Biryani', data: riceAndBiryani },
              { id: 'snacks', title: 'Gourmet Snacks', data: snacks },
              { id: 'drinks', title: 'Refreshing Drinks', data: drinks },
              { id: 'desert', title: 'Sweet Temptations', data: desert }
            ].map(cat => (
              cat.data.length > 0 && (
                <div key={cat.id} id={cat.id} className="category-section mb-4 animate__animated animate__fadeIn">
                  <h2 className="category-title">{cat.title}</h2>
                  <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={25}
                    navigation={true}
                    mousewheel={{ forceToAxis: true }}
                    pagination={{ clickable: true }}
                    watchSlidesProgress={true}
                    className="menu-swiper"
                  >
                    {cat.data.map((item) => (
                      <SwiperSlide key={item._id} className="h-auto" style={{ width: '350px' }}>
                        <div className="h-100 p-2">
                          <Card item={item} handleClick={handleClick}/>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )
            ))}
        </div>
    </div>
  )
}

export default Viewproducts