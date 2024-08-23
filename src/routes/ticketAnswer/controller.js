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
    let newTicketAnswer = new TicketAnswer({
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

    const user = await User.findById(req.user._id);
    if (
      user.ticketRoleCode !== TICKET_ROLE_CODES.ADMIN && user.ticketRoleCode !== TICKET_ROLE_CODES.AGENT)
       {
      return res.status(403).json({ error: "Forbidden" });
    }
    const ticketAnswer = await TicketAnswer.findByIdAndDelete(req.params.id);
    if (!ticketAnswer) {
      return res.status(404).json({
        data: null,
        message: "the ticketAnswer with this id was not found",
      });
    }

    this.response({
      res,
      message: "ok",
      data: ticketAnswer,
    });
    
  }

  async updateTicketAnswer(req, res) {
    const user = await User.findById(req.user._id);
    const ticketAnswer = await TicketAnswer.findById(req.params.id);
    if (
      user.ticketRoleCode === TICKET_ROLE_CODES.ADMIN || user.ticketRoleCode === TICKET_ROLE_CODES.AGENT) {

      const ticketAnswer = await TicketAnswer.findByIdAndUpdate(
        req.params.id,
        {
          ticketId: req.body.ticketId,
          answerText: req.body.answerText,
          updatedAt: Date.now(),
        },
        { new: true }
      );
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!ticketAnswer) {
      return res.status(404).json({
        data: null,
        message: "the ticketAnswer with this id was not found",
      });
    }

    this.response({
      res,
      message: "ok",
      data: ticketAnswer,
    });
    
  }
})();
