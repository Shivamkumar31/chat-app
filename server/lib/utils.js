
import jwt from "jsonwebtoken";




// fuction to genrate a token for a user 

export const generateToken=(userId)=>{

const token =jwt.sign({userId},process.env.JWT_SECRET);

  return token;
      

}








