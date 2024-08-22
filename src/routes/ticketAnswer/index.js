const express=require('express')
const router=express.Router();
const controller=require('./controller')
const validator=require('./validator')


router.get(
  '/',
  controller.getTicketAnswer
)

router.post(
  '/',
  validator.createValidator(),
  controller.createTicketAnswer
)

router.delete(
  '/:id',
  controller.deleteTicketAnswer
)

router.put(
  '/:id',
  validator.updateValidator(),
  controller.updateTicketAnswer
)


module.exports=router;