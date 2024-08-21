const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  createValidator() {
    return  [
      check("title").not().isEmpty().withMessage("title cant be empty"),
      check("description").not().isEmpty().withMessage("description cant be empty"),
      check("priority").not().isEmpty().withMessage("priority cant be empty"),
    ];
  }
  updateValidator() {
    return [
    check("title").not().isEmpty().withMessage("title cant be empty"),
    check("description").not().isEmpty().withMessage("description cant be empty"),
    check("priority").not().isEmpty().withMessage("priority cant be empty"),
  ]
}
})();