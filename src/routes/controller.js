const autoBind=require('auto-bind')
const{validationResult}=require('express-validator')
const User=require('./../models/users')
module.exports=class{
  constructor(){
    autoBind(this)
    this.User=User
  }




  response({res,message,code=200,data={}}){
    res.status(code).json({
      message,
      data
    });

  }
}