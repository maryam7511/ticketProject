const express=require('express')
const router=express.Router();
const authRouter=require('./auth')

router.route('/auth',authRouter);

module.exports=router;