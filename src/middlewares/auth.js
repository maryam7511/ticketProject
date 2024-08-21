const config=require('config')
const jwt=require('jsonwebtoken')
const {User}=require('./../models/users')


async function isLoggined(req,res,next) {
  const token=req.header("x-auth-token");
  if(!token)res.status(401).send('access denird')
   try{
    const decoded= jwt.verify(token,process.env.jwt_key)
    const user=await User.findById(decoded._id)
    console.log(user)
    req.user=user
    next()
  }catch(ex){
    res.status(400).send('invalid token')

  }
}


async function isAdmin(req,res,next) {
  if(req.user.ticketRoleCode==="USER") res.status(403).send('access denied')
    next();

}

module.exports={
  isLoggined,isAdmin
}