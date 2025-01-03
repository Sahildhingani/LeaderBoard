// import 
const express=require("express");
const mongoose=require("mongoose");
const User=require("./model/usermodel");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=express();
const PORT=8000;
require('dotenv').config()
const Userrouter=require("./router/userrouter");
// connect with mongodb 

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongodb is connected ")).catch((error)=>console.log("mongodb error",error));

// middlewears
const corsOptions = {
    origin: "http://localhost:5173",  // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  
  // Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}); //
app.use(cookieParser());
app.use("/user",Userrouter);
  

// server 
app.listen(PORT,()=>console.log(`Server Started at port number ${PORT}`));