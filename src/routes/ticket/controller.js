const controller=require('./../controller')
const _ =require('lodash')
const { TICKET_ROLE_CODES } = require("./../../models/constants");
const { Ticket } = require("./../../models/tickets");
const { User } = require("./../../models/users");


module.exports= new (class extends controller {
  
  async getTicket(req,res) {
  let data = [];
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;


    const user = await User.findById(req.user._id);
  if (
    user.ticketRoleCode === TICKET_ROLE_CODES.ADMIN ||user.ticketRoleCode === TICKET_ROLE_CODES.MANAGER) {
     data = await Ticket.find().populate("assignedTo", "name").populate("createdBy", "name");
  } else if (user.ticketRoleCode === TICKET_ROLE_CODES.AGENT) {
     data = await Ticket.find({ assignedTo: req.user._id }).populate("assignedTo", "name").populate("createdBy", "name");
  } else {
     data = await Ticket.find({ createdBy: req.user._id });
  }
  data.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
  res.paginatedResults = {
    results: data.slice(startIndex, endIndex),
    currentPage: page,
    totalPages: Math.ceil(data.length / limit),
  };

  this.response({
    res,message:'ok',data:res.paginatedResults
  })
    
    }


  async createTicket(req,res) {
    
    const { title, description, status, priority, assignedTo } = req.body;
    let newTicket = new Ticket({
      title,
      description,
      priority,
      status,
      assignedTo,
      createdBy: req.user._id,
    });
    newTicket = await newTicket.save();
    this.response({
      res,message:'ok',data:newTicket
    })
    
    }



  async deleteTicket(req,res) {
       const user = await User.findById(req.user._id);
  if (
    user.ticketRoleCode !== TICKET_ROLE_CODES.ADMIN && user.ticketRoleCode !== TICKET_ROLE_CODES.AGENT) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) {
    return res.status(404).json({
      data: null,
      message: "the ticket with this id was not found",
    });
  }
  
  this.response({
    res,message:'ok',data:ticket
  })
      
    }
  async updateTicket(req,res) {
    
    const user = await User.findById(req.user._id);
    

    const ticket = await Ticket.findById( req.params.id);
    if (
      user.ticketRoleCode === TICKET_ROLE_CODES.USER && ticket.createdBy.toString() === user._id.toString()) {
        const ticket = await Ticket.findByIdAndUpdate(
          req.user._id,
          {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            assignedTo: req.body.assignedTo,
            updatedAt: Date.now(),
          },
          { new: true }
        );
    }
    else if(user.ticketRoleCode === TICKET_ROLE_CODES.ADMIN ||user.ticketRoleCode === TICKET_ROLE_CODES.MANAGER){
      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          priority: req.body.priority,
          status: req.body.status,
          assignedTo: req.body.assignedTo,
          updatedAt: Date.now(),
        },
        { new: true }
      );
    }
    else {
      return res.status(403).json({ error: "Forbidden" });
    }


    if (!ticket) {
      return res.status(404).json({
        data: null,
        message: "the ticket with this id was not found",
      });
    }

    this.response({
      res,message:'ok',data:ticket
    })
        
    }
    
})();