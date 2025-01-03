const jwt=require("jsonwebtoken");
const key="sahildhingani1234567890"
// functions

const sendToken=(user)=>{
    const data=jwt.sign(user,key);
    if(data){
        return data;
    }else{
        console.log("token error 1");
    }
}

const check=(token)=>{
    const data=jwt.verify(token,key);
    if(data){
        return data;
    }else{
        console.log("token error 2");
    }
}

module.exports={sendToken,check};