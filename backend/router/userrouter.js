const express=require("express");
const handlesignup=require("../logic/signup");
const handlelogin=require("../logic/login");
const handlelogout=require("../logic/logout");
const fetchLeetCodeUserProgress=require("../logic/leetcodedata");
const senddata=require("../logic/senddata");
const Router=express.Router();
const fetchLeetCodeUserRanking=require("../logic/FetchRank");
// signUp
Router.post("/signup",handlesignup);

// login 
Router.post("/login",handlelogin);

// logout 

Router.get("/logout",handlelogout);


// get the data of user 
Router.post("/ranking",fetchLeetCodeUserProgress)

// send all the backend data on front end 
Router.post("/getdata",senddata);

Router.post("/getrank",fetchLeetCodeUserRanking);

module.exports=Router;