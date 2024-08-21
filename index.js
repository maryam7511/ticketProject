require('dotenv').config()
const express=require('express')
const app=express()
const debug= require('debug')("app:main")


require('./startup/config')(app,express);

require('./startup/db')();

const port = process.env.PORT
app.listen(port, ()=>console.log(`listening on port ${port}`))