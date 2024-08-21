const express=require('express')
const router=express.Router();
const authRouter=require('./auth')
const userRouter=require('./user')
const adminRouter=require('./admin')

const error=require('./../middlewares/error')

const {isLoggined,isAdmin}=require('./../middlewares/auth')

router.use('/auth',authRouter);
router.use('/user',isLoggined,userRouter);
router.use('/admin',isLoggined,isAdmin,adminRouter);

router.use(error)

module.exports=router;