const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const MongoDBSession = require('connect-mongodb-session')(session);
const app = express()
const path = require('path')
const UserModel = require('./models/User')
const bp = require('body-parser');


mongoose.connect('mongodb://localhost:27017/sessions',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res)=>{
    console.log('mongoDB Connected')
})

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

    
app.set("view engine","ejs")
app.use(session({
    secret : 'chiave segreta',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use("/",express.static(path.resolve(__dirname,"../proveHTML/")))

app.get('/',(req,res)=>{
    res.send("ciao a tutti")
})



app.get("/login",(req,res)=>{
    res.sendFile("C:/Users/alb20/OneDrive/Desktop/alberto/progetti/swAndrea/proveHTML/access_page.html")
})




app.post("/login", async (req,res)=>{
    const {nomeUtente, password} = req.body
    const user = await UserModel.findOne({username:nomeUtente})
    if(!user){
        return res.redirect("/login")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.redirect("/login")
    }
    req.session.isAuth = true
    res.redirect("/dashboard")
})

app.get("/dashboard",isAuth,(req,res)=>{
    console.log("autenticato")
    res.sendFile(path.resolve(__dirname,"../eliminare.html"))
})

app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw  err;
        res.redirect("/")
    })
})
app.listen(5000, ()=>{
    console.log('server is listening on port  5000')
    

})
