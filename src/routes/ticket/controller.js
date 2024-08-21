const controller=require('./../controller')
const _ =require('lodash')

module.exports= new (class extends controller {
  async getTicket(req,res) {
    res.send('user dashboard')
    
    }
  async createTicket(req,res) {
    res.send('user dashboard')
    
    }
  async deleteTicket(req,res) {
      res.send('user dashboard')
      
    }
  async updateTicket(req,res) {
        res.send('user dashboard')
        
    }
    
})();