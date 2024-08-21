require('express-async-errors')
const debug= require('debug')("app:main")
const winston=require('winston')


module.exports=function(){
  process.on('uncaughtException',(ex)=>{
   debug(x)
    winston.error(ex.message,ex)
    process.exit(1)
  
  })
  process.on('unhandledRejection',(ex)=>{
    debug(x)
    winston.error(ex.message,ex)
    process.exit(1)
  
  })
  winston.add(new winston.transports.File({filename: 'logfile.log'}))

}