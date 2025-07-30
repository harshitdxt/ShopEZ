import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import './App.css'
import SignInPage from './Pages/SignInPage'
import LogInPage from './Pages/LogInPage'
import AuthProvider from './Context/AuthContext'
import FrontPage from './Pages/FrontPage'
import AboutPage from './Pages/AboutPage'
import { ToastContainer } from 'react-toastify'
import ContactUsPage from './Pages/ContactUsPage'
import Layout from './components/Layout'
import AllProducts from './Pages/AllProductsPage'
import ManageProductPage from './Pages/ManageProductPage'
import SingleProduct from './Pages/SingleProduct'
import MyProductPage from './Pages/MyProductPage'
import CartPage from './Pages/CartPage'
import MyOrdersPage from './Pages/MyOrdersPage'
import ManageOrdersPage from './Pages/ManageOrdersPage'
import ProfilePage from './Pages/ProfilePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AuthProvider>
      
          <BrowserRouter>
           <ToastContainer />
        <Routes>
         <Route path="/" element={<Layout />}>
           <Route index element={<HomePage />} />
          <Route path='/signin' element={<SignInPage/>} />
          <Route path='/login' element={<LogInPage/>} />
          <Route path='/customer' element={<FrontPage/>} />
          <Route path='/seller' element={<FrontPage/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/allproducts' element={<AllProducts/>} />
          <Route path='/contact' element={<ContactUsPage/>} />
          <Route path='/manage-products' element={<ManageProductPage/>} />
           {/* Update mode */}
        <Route path="/manage-products/:id" element={<ManageProductPage />} />
           <Route path='/product/:id' element={<SingleProduct/>} />
           <Route path='/myproducts' element={<MyProductPage/>} />
            <Route path='/cart' element={<CartPage/>} />
             <Route path='/orders' element={<MyOrdersPage/>} />
             <Route path="/manage-orders" element={<ManageOrdersPage />} />
             <Route path='/user-profile' element={<ProfilePage/>} />

          </Route>
        </Routes>
     </BrowserRouter>
     
     </AuthProvider>
     
    </>
  )
}

export default App
