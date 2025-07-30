import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout({children}) {
  return (
    
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <main className="flex-grow pt-16">
            <Outlet/>
          </main>
          <Footer/>
        </div>
    
  )
}

export default Layout