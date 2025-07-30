import React from 'react'
import Navbar from '../components/Navbar'
import { ArrowRight, Star } from "lucide-react"

function HomePage() {
  return (
    <>
    <Navbar/>
    <div>
HomePage
    </div>

    <section className="relative bg-gradient-to-b from-indigo-500 to-purple-500 overflow-hidden text-white">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm opacity-80">Trusted by 10,000+ customers</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Shop Smart,
              <br />
              <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Shop Easy
              </span>
            </h1>

            <p className="text-lg opacity-80 mb-8 max-w-lg mx-auto lg:mx-0">
              Discover amazing products at unbeatable prices. Your one-stop destination for everything you need.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg text-sm flex items-center gap-2 hover:bg-indigo-100 transition group">
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-white/50 bg-white/10 text-indigo-600 px-6 py-3 rounded-lg text-sm hover:bg-white/20 transition">
                Browse Categories
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src='https://metacake.com/wp-content/uploads/2022/02/How-to-Create-the-Perfect-Hero-Image-for-Your-Ecommerce-Homepage-1738x1160-textlogo-1-1200x801.jpg'
                alt="Shopping Experience" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-black rounded-2xl p-4 shadow-xl animate-bounce">
              <div className="text-center">
                <span className="text-2xl font-bold text-indigo-600">50%</span>
                <p className="text-xs text-gray-500">OFF Today</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}

export default HomePage