const express=require('express')
const router=express.Router()


// importing all the controller for routing purpose

const {SignIn,LogIn,getMyProfile,UpdateMyProfile,LogOut}=require('../controller/UserController.js')
const { verifyToken } = require("../middleware/AuthOfToken.js");

// Routing of all routes
router.post('/signin',SignIn)
router.post('/login',LogIn)
router.get('/user/me',verifyToken,getMyProfile)
router.patch('/user/update',verifyToken,UpdateMyProfile)
router.post('/logout',LogOut)


router.get('/verify-token', verifyToken, (req, res) => {
  res.json({ user: req.user });
});





router.get('/user',()=>{
    console.log('User Routes ')
})

module.exports=router