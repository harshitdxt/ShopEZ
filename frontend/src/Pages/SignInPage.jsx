import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SignInPage() {
  const [signInForm,setSignInForm]=useState({
     name:'',
     email:'',
     password:'',
      contactNumber: '',
    profileImage: '',
    userType:'customer',
    sellerDetails: {
      website: '',
      shopName: '',
      gstNumber: '',
      businessType: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    }
  })

  const navigate=useNavigate()
  const handlesingin=async()=>{
    // Simple validation
  const { name, email, contactNumber, password } = signInForm;

  // Name validation: not empty
  if (!name.trim()) {
    toast.error("Name is required");
    return;
  }

  // Email validation regex (simple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim() || !emailRegex.test(email)) {
    toast.error("Please enter a valid email");
    return;
  }

  // Contact number validation: digits only and length between 7-15
  const phoneRegex = /^[0-9]{7,15}$/;
  if (!contactNumber.trim() || !phoneRegex.test(contactNumber)) {
    toast.error("Please enter a valid contact number");
    return;
  }

  // Password validation: min length 6 (you can customize)
  if (!password || password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }
    // 
    console.log('Submit button is clicked', signInForm)
    try {
      const response=await axios.post('http://localhost:5000/api/v1/signin',signInForm , { withCredentials: true })
      console.log('User has successfully registeed',response.data)
      toast.success("Signup successfully !");
      navigate('/login')
      
    } catch (error) {
      console.log('Error in register',error)
    }
  }
  // const handleChange=(e)=>{
  //       e.preventDefault()
  //        console.log('Changed:', e.target.name, e.target.value);
  //       setSignInForm({...signInForm,[e.target.name]:e.target.value})
  //       console.log('Handle change Sign form data',signInForm)

  //   }

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (["website", "shopName", "gstNumber", "businessType"].includes(name)) {
    // Update sellerDetails top-level fields
    setSignInForm(prev => ({
      ...prev,
      sellerDetails: {
        ...prev.sellerDetails,
        [name]: value,
      },
    }));
  } else if (["street", "city", "state", "pincode"].includes(name)) {
    // Update sellerDetails.address fields
    setSignInForm(prev => ({
      ...prev,
      sellerDetails: {
        ...prev.sellerDetails,
        address: {
          ...prev.sellerDetails.address,
          [name]: value,
        },
      },
    }));
  } else {
    // Update top-level fields
    setSignInForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }
};


    // useEffect(()=>{
    //     console.log('Completed sign in form useeffect',signInForm)
    // },[signInForm])
  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
  <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl">
    <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
      Create Your ShopEZ Account
    </h2>

    <div className="space-y-4">
      {/* Common Fields */}
      <input
        name="name"
        value={signInForm.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg shadow-sm"
        placeholder="Full Name"
      />
      <input
        name="email"
        type="email"
        value={signInForm.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg shadow-sm"
        placeholder="Email Address"
      />
      <input
        name="password"
        type="password"
        value={signInForm.password}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg shadow-sm"
        placeholder="Password"
      />
      <input
        name="contactNumber"
        value={signInForm.contactNumber}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg shadow-sm"
        placeholder="Contact Number"
      />
      <input
        name="profileImage"
        value={signInForm.profileImage}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg shadow-sm"
        placeholder="Profile Image URL"
      />

      <select
        name="userType"
        value={signInForm.userType}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg bg-white shadow-sm"
      >
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
        <option value="admin">Admin</option>
      </select>

      {/* Seller Fields */}
      {signInForm.userType === "seller" && (
        <div className="bg-gray-50 p-6 mt-4 rounded-lg border shadow-inner space-y-4 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Seller Details</h3>

          <input
            name="website"
            value={signInForm.sellerDetails.website}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Website"
          />
          <input
            name="shopName"
            value={signInForm.sellerDetails.shopName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Shop Name"
          />
          <input
            name="gstNumber"
            value={signInForm.sellerDetails.gstNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="GST Number"
          />
          <input
            name="businessType"
            value={signInForm.sellerDetails.businessType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="Business Type"
          />

          <h4 className="font-medium text-gray-600">Business Address</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="street"
              value={signInForm.sellerDetails.address.street}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              placeholder="Street"
            />
            <input
              name="city"
              value={signInForm.sellerDetails.address.city}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              placeholder="City"
            />
            <input
              name="state"
              value={signInForm.sellerDetails.address.state}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              placeholder="State"
            />
            <input
              name="pincode"
              value={signInForm.sellerDetails.address.pincode}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              placeholder="Pincode"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 text-center">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 text-lg tracking-wide"
          onClick={handlesingin}
        >
          Register
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  )
}

export default SignInPage