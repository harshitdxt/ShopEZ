const express=require('express')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const PORT=process.env.PORT||4000


// middleware to parse the json
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
const {verifyToken}=require('./middleware/AuthOfToken')

// to access the backend from frontend
// app.use(cors())
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 frontend origin
    credentials: true, // 👈 allow credentials (cookies)
  })
);

// importing the  routes
const UserRoute=require('./route/UserRoute')
const ProductRoute=require('./route/ProductRoute')
const CartRoute=require('./route/CartRoute')
const OrderRoute=require('./route/OrderRoute')
const PdfRoute = require("./route/PdfRoute");



// mouting the routes with this 
app.use('/api/v1',UserRoute)
app.use('/api/v1',ProductRoute)
app.use('/api/v1',verifyToken,CartRoute)
app.use('/api/v1',verifyToken,OrderRoute)
app.use("/api/v1", verifyToken, PdfRoute);



// default route
app.get("/", (req, res) => {
  res.send("This is through backend");
});

app.get('/test-cookie', (req, res) => {
  res.cookie("test", "works!", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    maxAge: 60000 // 1 min
  });
  res.send("Cookie test set.");
});


// db Connection Code
const MONGODB_URL = "mongodb://localhost:27017/Ecommerce"; // Local MongoDB
mongoose
  .connect(MONGODB_URL, {})
  .then(() => console.log("Db connection is successfully"))
  .catch((err) => {
    console.log("issue in db connection", err);
    // console.log(err.message)
    // process.exit(1)
  });


// app running code
app.listen(PORT,()=>{
    console.log(`The Server is listening at Port b ${PORT}`)
})