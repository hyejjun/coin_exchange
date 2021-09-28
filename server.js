const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const db = require('./models')
const morgan = require('morgan')
const logger = require('./logger')
const router = require('./routes')
require('dotenv').config()

const PORT = process.env.PORT || 3500

db.sequelize.sync({force:true})
.then( _ => {
    logger.info(`DB connection success`);
})
.catch( err =>{
    logger.info(`DB disconnection ${err}`);
})

app.use('/',router)

app.use(morgan('dev'))

app.set('view engine','html')
nunjucks.configure('views',{express:app,})


// app.get(`/`,(req,res)=>{
//     res.render('index')
// })

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 정보가 없습니다`)
    error.status = 404
    logger.error(error.message)
    res.render('404')
})

app.listen(PORT,()=>{
    logger.info(`server open ${PORT}`);
})