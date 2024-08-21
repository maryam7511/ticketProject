const controller=require('./../controller')
const _ =require('lodash')
const bcrypt= require('bcryptjs')
const config=require('config')
const jwt=require('jsonwebtoken')
const error = require('../../middlewares/error')
const {User}=require('./../../models/users')

module.exports= new (class extends controller {
  async register(req,res) {
    let user= await User.findOne({email:req.body.email})
    if(user){
      return this.response({
        res,code:400,message:'this user already registered'
      })
    }
    //const{email,name,password}=req.body;
    //user = new this.user({email,name,password})
    user= new User(_.pick(req.body,["name","email","password"]))
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();

    this.response({
      res,message:'the user successfuly registered',
      data:_.pick(user,["_id","name","email"])
    })


    
    
  }
  async login(req,res) {
   
    const user=await User.findOne({email:req.body.email})
    if(!user){
      return this.response({
        res,code:400,message:'invalid email or password'
      })
    }
    const isValid=await bcrypt.compare(req.body.password,user.password)
    if(!isValid){
      return this.response({
        res,code:400,message:'invalid email or password'
      })
    
  }
  const token=jwt.sign({_id:user.id},process.env.jwt_key)
      this.response({
        res,message:'successfuly logged in',data:{token}
      })
    }
})();