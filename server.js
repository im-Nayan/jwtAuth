const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const PORT = 2000;

const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, 'public')));


// SESSION SECTION
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'SESSION_SECRET_KEY',
  cookie: {
      maxAge: 60 * 60 * 1000
  }
}))
app.use(cookieParser());
app.use(flash());

app.set('view engine', 'ejs');
app.set('views','views')

// DEFINE ROUTER
const mainRouter = require('./router/main_Router');
app.use(mainRouter)




mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://nayan:nayan123@cluster0.o2qoh.mongodb.net/interviewTask', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(connect=>{
    app.listen(PORT,()=>{
        console.log('port no 2000');
        console.log(`http://127.0.0.1:${PORT}`);

    })
})
