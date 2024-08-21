const express=require('express')
const router=express.Router();
const controller=require('./controller')

router.get(
  '/',
  controller.getTicket
)

router.post(
  '/',
  controller.createTicket
)

router.delete(
  '/:id',
  controller.deleteTicket
)

router.put(
  '/:id',
  controller.updateTicket
)


module.exports=router;