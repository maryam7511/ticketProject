const mongoose =require('mongoose')
const debug= require('debug')("app:main")


module.exports=function(){
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>debug('connected to mongodb'))
  .catch(()=>debug('could not connect to mongodb'))
}