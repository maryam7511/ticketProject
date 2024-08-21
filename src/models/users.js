const mongoose=require('mongoose')
const { TICKET_ROLE_CODES } = require('./constants');  


const userSchema=new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true, unique: true },  
  password: { type: String, required: true },  
  ticketRoleCode: { type: String, required: true, enum: Object.values(TICKET_ROLE_CODES),default: 'USER'},  
  createdAt: { type: Date, default: Date.now },  
  updatedAt: { type: Date, default: Date.now } 
})
const User =mongoose.model("User",userSchema)

module.exports= {User}