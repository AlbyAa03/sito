const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const MongoDBSession = require('connect-mongodb-session')(session);
const path = require('path')
const UserModel = require('../models/User')
const bp = require('body-parser');

function inizializzaDbAutenticazione(){
    mongoose.connect('mongodb://localhost:27017/sessions',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((res)=>{
        console.log('mongoDB Connected')
    })
}

const store = new MongoDBSession({
        uri: "mongodb://localhost:27017/sessions",
        collection: "mySession"    
})


const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        res.redirect("/login")
    }
}

module.exports = {inizializzaDbAutenticazione, isAuth,store}