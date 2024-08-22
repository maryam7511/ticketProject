const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  createValidator() {
    return  [
      check("ticketId").not().isEmpty().withMessage("ticketId cant be empty"),
      check("userId").not().isEmpty().withMessage("userId cant be empty"),
      check("answerText").not().isEmpty().withMessage("answerText cant be empty"),
    ];
  }
  updateValidator() {
    return [
    check("ticketId").not().isEmpty().withMessage("ticketId cant be empty"),
    check("userId").not().isEmpty().withMessage("userId cant be empty"),
    check("answerText").not().isEmpty().withMessage("answerText cant be empty"),
  ]
}
})();