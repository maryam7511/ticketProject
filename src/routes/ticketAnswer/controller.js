const controller = require("./../controller");
const _ = require("lodash");
const { TICKET_ROLE_CODES } = require("./../../models/constants");
const { Ticket } = require("./../../models/tickets");
const { User } = require("./../../models/users");
const { TicketAnswer } = require("./../../models/ticketAnswer");

module.exports = new (class extends controller {
  async getTicketAnswer(req, res) {
    
  }

  async createTicketAnswer(req, res) {
    const { ticketId, userId, answerText } = req.body;
    let newTicketAnswer = new Ticket({
      ticketId,
      userId:req.user._id,
      answerText
       
    });
    newTicketAnswer = await newTicketAnswer.save();
    this.response({
      res,
      message: "ok",
      data: newTicketAnswer,
    });
  }

  async deleteTicketAnswer(req, res) {
    
    
  }
  async updateTicketAnswer(req, res) {
    
    
  }
})();
