require('dotenv').config()
const express=require('express')
const app=express()
const debug= require('debug')("app:main")
const router=require('./src/routes')


require('./startup/config')(app,express);

require('./startup/db')();


app.use('/api',router)

const port = process.env.PORT
app.listen(port, ()=>console.log(`listening on port ${port}`))