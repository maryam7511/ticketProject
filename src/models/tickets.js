const mongoose=require('mongoose')


const ticketSchema=new mongoose.Schema({
  title: { type: String, required: true },  
  description: { type: String, required: true },   
  priority: { type: String, enum: ['low', 'medium', 'high'] ,required: true},  
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now } 
  

})
const Ticket =mongoose.model("Ticket",ticketSchema)


module.exports= {Ticket}