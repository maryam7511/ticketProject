const express=require('express')
const router=express.Router();
const controller=require('./controller')
const validator=require('./validator')

router.get(
  '/',
  controller.getTicket
)

router.post(
  '/',
  validator.createValidator(),
  controller.createTicket
)

router.delete(
  '/:id',
  controller.deleteTicket
)

router.put(
  '/:id',
  validator.updateValidator(),
  controller.updateTicket
)


module.exports=router;