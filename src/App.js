import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout/Common
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Gallery from './Components/Gallery/Gallery'
import Contactus from './Components/Contactus/Contactus'

// Auth
import LoginSignup from './Components/LoginSignup/LoginSignup'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'

// Dashboards
import Userdashboard from './Components/Userdashboard/Userdashboard'
import Admindashboard from './Components/Admindashboard/Admindashboard'

// Features
import Userprofile from './Components/Userprofile/Userprofile'
import Cart from './Components/Cart/Cart'
import Viewproducts from './Components/Viewproducts/Viewproducts'
import Addproduct from './Components/Addproduct/Addproduct'
import UserOrders from './Components/UserOrders/UserOrders'
import AdminOrders from './Components/AdminOrders/AdminOrders'

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Global Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        <Routes>
          <Route path='/' element={<Home/>} />
          
          {/* Auth Routes */}
          <Route path='/login' element={<LoginSignup />}>
             <Route path='' element={<Login/>} />
             <Route path='signup' element={<Signup/>} />
          </Route>
          
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/contactus' element={<Contactus/>}/>
          <Route path='/products' element={<Viewproducts/>}/>
          
          {/* User Dashboard */}
          <Route path='/user-dashboard' element={<Userdashboard/>}>
             <Route path='profile' element={<Userprofile/>} />
             <Route path='cart' element={<Cart/>} />
             <Route path='products' element={<Viewproducts/>} />
             <Route path='orders' element={<UserOrders />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path='/admin-dashboard' element={<Admindashboard/>}>
              <Route path='addproduct' element={<Addproduct/>} />
              <Route path='products' element={<Viewproducts/>} />
              <Route path='orders' element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
