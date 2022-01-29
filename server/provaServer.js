const sqlite3 = require('sqlite3').verbose()
const express = require('express');
const session = require('express-session')
const {readFile,writeFile}      = require('fs')
const path = require('path')
let db = new sqlite3.Database(path.resolve(__dirname,'../dbAndrea.db'), sqlite3.OPEN_READWRITE)
sql = "SELECT * FROM libri"


function returnQuery(query){
    return db.get(query,[],(err, rows) => {
        if(err != null){
            console.log(sql)
            return "query non valida"
        }
        temp = Object.assign({},rows)
        return temp
    });
}

const app = express()

app.use("/",express.static(path.resolve(__dirname,"../")))
app.use(session({
    secret : 'chiave segreta',
    resave: false,
    saveUninitialized: false
}))

app.get('/tuttiilibri',(req,res)=>{
    db.all(sql,[],(err, rows) => {
        if(err != null){
            console.log(sql)
            res.status(500).send("problema")
        }else{
            res.status(200).json(rows)
        }
    }); 
})



app.use("/",express.static(path.resolve(__dirname,"../proveHTML/")))

app.get('/co',(req,res)=>{
    
    //res.sendFile(path.resolve(__dirname,"../proveHTML/libraio.html"))
    res.sendFile(path.resolve(__dirname,"../eliminare.html"))
    console.log(req.session)     
})

app.get("/tutteStatistiche",(req,res)=>{
    console.log(returnQuery("select * from libri"))
    db.all(sql,[],(err, rows) => {
        if(err != null){
            console.log(sql)
            res.status(500).send("problema")
        }else{
            res.status(200).json(rows)
        }
    });

})
app.all("*",(req,res)=>{
    console.log(req.url)
    res.status(404).send('resource not found')
})
app.listen(5000, ()=>{
    console.log('server is listening on port  5000')
})


