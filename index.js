process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
require('dotenv').config()
const express=require('express')
const app=express()
const debug= require('debug')("app:main")
const router=require('./src/routes')
const winston=require('winston')



require('./startup/config')(app,express);

require('./startup/db')();
require('./startup/logging')();

app.use('/api',router)

const port = process.env.PORT
app.listen(port, ()=>console.log(`listening on port ${port}`))