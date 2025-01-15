const express=require("express");
const handlesignup=require("../logic/signup");
const handlelogin=require("../logic/login");
const handlelogout=require("../logic/logout");
const fetchLeetCodeUserProgress=require("../logic/leetcodedata");
const senddata=require("../logic/senddata");
const fetchActiveBadges=require("../logic/ActiveBadge");
const Router=express.Router();
const fetchLeetCodeUserRanking=require("../logic/FetchRank");
const fetchAcceptance=require("../logic/Acceptancerate");
const fetchSubmissions = require("../logic/Submissions");
const fetchQuestionsWithTopics=require("../logic/QuestionsWithTopics");
const Handlerequest=require("../logic/createhelp");
const handleRequest = require("../logic/createhelp");
// router call for the badges 
Router.post("/badges",fetchActiveBadges);
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

// get the acceptance rate of the user 
Router.post("/acceptance",fetchAcceptance);

// get the submission of the user 

Router.post("/submission",fetchSubmissions);

// fetch user question with the topic 

Router.post("/Question",fetchQuestionsWithTopics);

// create request of the user 

Router.post("/Request",handleRequest);

module.exports=Router;