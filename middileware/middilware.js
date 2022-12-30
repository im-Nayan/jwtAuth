
const mainModel = require('../model/main_model');


exports.check = (req, res, next) => {
    const {firstname,lastname,email,phone,password,confirmpass } = req.body;
    // console.log(req.body);
    mainModel.findOne({ email }, (err, data) => {
        if (data) {
            // console.log('data',data);
            console.log('This email is Already Exist');
            req.flash('failed','This email is Already Exist');
            
            return(res.redirect('/register'));
        }
    })
    // mainModel.findOne({ phone }, (err, data) => {
    //     if (data) {
    //         if(data.email==email && data.phone==phone){

    //             console.log('This email and Phone Number are Already Exist');
    //             req.flash('failed','This email and Phone are Already Exist');
                
    //             return(res.redirect('/register'));
    //         }else{
    //             console.log('Phone No is Already Exist');
    //             req.flash('failed','Phone No is Already Exist');
                
    //             return(res.redirect('/register'));
    //         }
    //     }
    // })
    
    if (!firstname) {
        console.log("Please Enter First Name");
        req.flash('failed',"Please Enter First Name");
        res.redirect('/register');
        return;
    }
    if (!lastname) {
        console.log("Please Enter lastname Name");
        req.flash('failed',"Please Enter lastname Name");
        res.redirect('/register');
        return;

    }
    if (!email) {
        console.log("Please Enter email");
        req.flash('failed',"Please Enter email");
        res.redirect('/register');
        return;
    }
    if (!phone) {
        console.log("Please Enter phone");
        req.flash('failed',"Please Enter phone");
        res.redirect('/register');
        return;
    }
    if (!password) {
        console.log("Please Enter Password");
        req.flash('failed',"Please Enter Password");
        res.redirect('/register');
        return;
    }
    if (!confirmpass) {
        console.log("Please Enter Re_password");
        req.flash('failed',"Please Enter Re_password");
        res.redirect('/register');
        return;
    }
    if (password != confirmpass) {
        console.log("Password or Confirm Password Doesn\'t Match");
        req.flash('failed',"Password or Confirm Password Doesn\'t Match");
        res.redirect('/register');
        return;
    }
    next();
}


exports.signInCheck = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        console.log("Please Enter email");
        req.flash('failed',"Please Enter email");
        res.redirect('/');
        return;
    }
    if (!password) {
        console.log("Please Enter Password");
        req.flash('failed',"Please Enter Password");
        res.redirect('/');
        return;
    }
    next();
}