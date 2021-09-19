if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

// user
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email), // 這個方法可以找到 user mail
  id => users.find(user => user.id === id)  // 找到
)


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.json()) //使用 json
app.use(expressLayouts)
app.use(express.static('public'))


//connect to Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Datebase'))

app.use('/', indexRouter)
app.use('/users', userRouter)  
// localhost:5000/users
// 讓route 能夠被讀取

app.listen(process.env.PORT || 5000)