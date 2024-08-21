const controller=require('./../controller')
const _ =require('lodash')

module.exports= new (class extends controller {
  async getTicket(req,res) {
    res.send('user dashboard')
    
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
    res.json({
      data: newTicket,
      message: "ok",
    });
    
    }



  async deleteTicket(req,res) {
       const user = await User.findById(req.user._id);
  if (
    user.ticketRoleCode !== TICKET_ROLE_CODES.ADMIN &&
    user.ticketRoleCode !== TICKET_ROLE_CODES.AGENT
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) {
    return res.status(404).json({
      data: null,
      message: "the ticket with this id was not found",
    });
  }
  res.json({
    data: ticket,
    message: "ok",
  });
      
    }
  async updateTicket(req,res) {
    
    const user = await User.findById(req.user._id);
    if (
      user.ticketRoleCode === TICKET_ROLE_CODES.USER &&
      ticket.createdBy.toString() !== user._id.toString()
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

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
    if (!ticket) {
      return res.status(404).json({
        data: null,
        message: "the ticket with this id was not found",
      });
    }
    res.json({
      data: ticket,
      message: "ok",
    });
        
    }
    
})();