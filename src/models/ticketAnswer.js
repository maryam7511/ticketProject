const mongoose=require('mongoose')


const ticketAnswerSchema=new mongoose.Schema({
  
  
 
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket',required: true  },  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  answerText: { type: String, required: true }  , 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now } 
  

})

ticketAnswerSchema.pre('save',function(next){
  this.updatedAt=Date.now();
  next();

})
const TicketAnswer =mongoose.model("TicketAnswer",ticketAnswerSchema)


module.exports= {TicketAnswer}