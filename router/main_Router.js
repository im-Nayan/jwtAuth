const express = require('express');
const mainController = require('../controller/main_Controller');
const mainMiddileware = require('../middileware/middilware');
const auth = require('../middileware/auth');

const mainRoute = express.Router();

// GET METHODS 
mainRoute.get('/',mainController.login);
mainRoute.get('/register',mainController.register);
mainRoute.get('/dashboard',auth.checkAuth,mainController.dashboard)
mainRoute.get('/logout',mainController.logout)


// POST METHODES
mainRoute.post('/register_post',mainMiddileware.check,mainController.register_post)
mainRoute.post('/login_post',mainMiddileware.signInCheck,mainController.login_post)

// EXPORTS SECTION
module.exports = mainRoute