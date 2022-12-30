const mainModel = require('../model/main_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER CONTROLLER
exports.register = (req, res) => {
    const err = req.flash('failed')

    // res.send('Hellow World')
    res.render('register',{err})

}

// LOGIN CONTROLLER
exports.login = (req, res) => {
    const err = req.flash('failed');
    const success = req.flash('success')
    // res.send('Hellow World')
    res.render('login',{err,success})

}

// register_post
exports.register_post = (req, res) => {
    console.log('req.body', req.body);
    new mainModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10)
    }).save().then(registerData => {
        // console.log('data register SuccessFully', registerData);
        req.flash('success','Register Successfull')

        res.redirect('/')

    }).catch(err => {
        console.log('data register Faild', err);
    })
}


// LOGIN POST
exports.login_post = (req, res) => {
    const { email, password } = req.body;

    mainModel.findOne({ email }, (err, data) => {
        if (data) {
            const hashpass = data.password
            const compare = bcrypt.compareSync(password, hashpass);
            if (compare) {
                const token = jwt.sign({
                    userData: data
                }, 'USER_TOKEN_KEY', { expiresIn: '60m' })
                res.cookie('userToken', token);
                console.log('password compare success');
                res.redirect('/Dashboard')
            } else {
                console.log('Password Doesn\'t Match');
        req.flash('failed','Password Doesn\'t Match')

                res.redirect('/')
            }


        } else {
            console.log('Email invallid', err);
        req.flash('failed','Email invallid')

            res.redirect('/')
        }
    })
}

// dashboard
exports.dashboard=(req,res)=>{
    if (req.cookieData) {
        res.render('dashboard')
    }else{
        res.redirect('/')
    }

}

// LOGOUT
exports.logout =(req,res)=>{
    if(req.cookies && req.cookies.userToken){
        req.flash('success','successfully Log Out')
        res.clearCookie('userToken')
        res.redirect('/')
    }else{
        console.log('you are not so smart');
        res.redirect('/')
    }
}