// require ai moduli
const express = require('express');
const session = require('express-session')
const bcrypt = require('bcryptjs')
const path = require('path')
const UserModel = require('./models/User')
const bp = require('body-parser');
const {inizializzaDbAutenticazione, isAuth,store} = require(path.resolve(__dirname,'./funzioniFinito/autenticazioneFinito'))
const {tutti} = require(path.resolve(__dirname,'./funzioniFinito/gestioneDbLibri'))

//inizializzazione variabili "importanti", globali, ...
const app = express()


// cose "strane" (USE E SET)
app.use("/",express.static(path.resolve(__dirname,"../proveHTML")))
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(session({
    secret : 'chiave segreta',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.set("view engine","ejs")



// tutti i get
app.get("/",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw  err;
    })
    res.sendFile(path.resolve(__dirname,'../proveHTML/index.html'))
})
app.get("/login",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw  err;
    })
    res.sendFile(path.resolve(__dirname,'../proveHTML/access_page.html'))
})
app.get("/libraio",isAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../proveHTML/libraio.html"))
})
app.get("/tuttiiLibri",isAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../proveHTML/tuttiLibri.html"))
})
app.get("/statistiche",isAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../proveHTML/tuttiLibri.html"))
})


// in dev

app.get("/tutti",tutt
i)

//app.get("/tutteStatistiche",tutteStatistiche)

//tutti i post
app.post("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw  err;
        res.redirect("/")
    })
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
    res.redirect("/tuttiilibri")
})



// server online (porta 5000)
app.listen(5000,'0.0.0.0', ()=>{
    console.log('server is listening on port  5000')
})
inizializzaDbAutenticazione()