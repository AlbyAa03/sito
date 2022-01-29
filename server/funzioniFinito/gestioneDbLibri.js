const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const {readFile}      = require('fs')

// instanzio l'oggetto db
let db = new sqlite3.Database(path.resolve(__dirname,'../../dbAndrea.db'), sqlite3.OPEN_READWRITE)



const tutti = (req,res)=>{
    db.all( "SELECT * FROM libri",[],(err, rows) => {
        if(err != null){
            console.log(sql)
            res.status(500).send("problema interno al server")
        }else{
            res.status(200).json(rows)
        }
    }); 
}

const tutteStatistiche = (req,res)=>{
    db.all( "SELECT * FROM libri",[],(err, rows) => {
        if(err != null){
            console.log(sql)
            res.status(500).send("problema interno al server")
        }else{
            res.status(200).json(rows)
        }
    }); 
}

module.exports = {tutti}






