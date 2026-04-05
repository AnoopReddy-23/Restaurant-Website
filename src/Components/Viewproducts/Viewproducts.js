import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
import { useNavigate } from 'react-router-dom'
import './Viewproducts.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../Slices/productSlice'
import { CartItems } from '../../Slices/cartSlice'
import { Button, Form, InputGroup, Row, Col, Container } from 'react-bootstrap'
import { FaSearch, FaLeaf } from 'react-icons/fa'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper'
import { toast } from 'react-hot-toast'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Navigation, Pagination, Mousewheel])

function Viewproducts() {
  //products from store
  let { products, isError, isSuccess, errMsg } = useSelector(
    (state) => state.product,
  )
  //userObj from store
  let { userObj, isSuccess: isuserSuccess } = useSelector((state) => state.user)

  //dispatch fun
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [isVegOnly, setIsVegOnly] = useState(false)

  let [starters, setStarters] = useState([])
  let [riceAndBiryani, setRiceAndBiryani] = useState([])
  let [snacks, setSnacks] = useState([])
  let [drinks, setDrinks] = useState([])
  let [desert, setDesert] = useState([])

  useEffect(() => {
    dispatch(getProducts())
    if (userObj.username) {
      dispatch(CartItems(userObj.username))
    }
  }, [])

  //this to be executed when either isSuccess or isError or search/veg filters changed
  useEffect(() => {
    if (isError) {
      console.error(errMsg)
    }
    if (isSuccess && products) {
      // Apply Filters
      const filtered = products.filter((item) => {
        const matchesSearch =
          item.food.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesVeg = isVegOnly
          ? item.isVeg === true || item.isVeg === 'true'
          : true
        return matchesSearch && matchesVeg
      })

      setStarters(filtered.filter((item) => item.foodType === 'starters'))
      setRiceAndBiryani(
        filtered.filter((item) => item.foodType === 'riceAndBiryani'),
      )
      setSnacks(filtered.filter((item) => item.foodType === 'snacks'))
      setDrinks(filtered.filter((item) => item.foodType === 'drinks'))
      setDesert(filtered.filter((item) => item.foodType === 'desert'))
    }
  }, [isSuccess, isError, products, searchTerm, isVegOnly])

  const handleClick = (item) => {
    const obj = {
      ...item,
      username: userObj.username,
      count: 1,
    }

    delete obj._id
    delete obj.foodType
    delete obj.description

    axios
      .post('/cart-api/create-cart', obj)
      .then((response) => {
        toast.success(response.data.message)
        dispatch(CartItems(userObj.username))
      })
      .catch((error) => toast.error('Failed to add to cart'))
  }

  useEffect(() => {
    if (isuserSuccess === false) {
      navigate('/login')
    }
  }, [isuserSuccess])

  return (
    <div className="menu-items container-fluid px-lg-5">
      <div className="menu-header-bar d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 mb-5 gap-4">
        <div className="section-info">
          <h1 className="section-title text-gold mb-1">Our Exquisite Menu</h1>
          <p className="text-muted small mb-0">
            Discover the finest flavors curated by our master chefs
          </p>
        </div>

        <div className="filter-controls d-flex flex-column flex-sm-row align-items-center gap-3">
          {/* Veg Toggle */}
          <div
            className={`veg-toggle-wrapper glass-card px-3 py-2 d-flex align-items-center ${isVegOnly ? 'veg-active' : ''}`}
          >
            <FaLeaf
              className={isVegOnly ? 'text-success me-2' : 'text-muted me-2'}
            />
            <span className="small text-muted me-3">Veg Only</span>
            <Form.Check
              type="switch"
              id="veg-switch"
              checked={isVegOnly}
              onChange={(e) => setIsVegOnly(e.target.checked)}
              className="custom-veg-switch"
            />
          </div>

          {/* Search Bar */}
          <InputGroup className="search-bar-group glass-card">
            <InputGroup.Text className="bg-transparent border-0 text-gold ps-3">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search for dishes, ingredients..."
              className="search-input bg-transparent border-0 text-white py-2 pe-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <div className="menu-categories mb-5 pt-1">
        {[
          { id: 'starters', title: 'Elegant Starters', data: starters },
          {
            id: 'riceAndBiryani',
            title: 'Main Course & Biryani',
            data: riceAndBiryani,
          },
          { id: 'snacks', title: 'Gourmet Snacks', data: snacks },
          { id: 'drinks', title: 'Refreshing Drinks', data: drinks },
          { id: 'desert', title: 'Sweet Temptations', data: desert },
        ].map(
          (cat) =>
            cat.data.length > 0 && (
              <div
                key={cat.id}
                id={cat.id}
                className="category-section mb-4 animate__animated animate__fadeIn"
              >
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
                    <SwiperSlide
                      key={item._id}
                      className="h-auto"
                      style={{ width: '350px' }}
                    >
                      <div className="h-100 p-2">
                        <Card item={item} handleClick={handleClick} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ),
        )}

        {/* Empty State */}
        {isSuccess &&
          starters.length === 0 &&
          riceAndBiryani.length === 0 &&
          snacks.length === 0 &&
          drinks.length === 0 &&
          desert.length === 0 && (
            <div className="text-center py-5 animate__animated animate__fadeIn">
              <div className="glass-card d-inline-block p-5 rounded-circle mb-4">
                <FaSearch size={50} className="text-gold opacity-50" />
              </div>
              <h3 className="text-gold">No Masterpieces Found</h3>
              <p className="text-muted">
                Try adjusting your search or filters to discover other flavors.
              </p>
              <Button
                variant="outline-gold"
                className="mt-3"
                onClick={() => {
                  setSearchTerm('')
                  setIsVegOnly(false)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
      </div>
    </div>
  )
}

export default Viewproducts
