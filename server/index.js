const express = require('express');
const app = express();
const mysql = require('mysql');
const cors =  require('cors');

let port = process.env.PORT || 3001;

const db = mysql.createPool({
    host:"us-cdbr-east-06.cleardb.net",
    user:"bbc2e3d82d142f",
    password:"4532f749",
    database:"heroku_097b4127bff040d"
})

app.use(cors());
app.use(express.json());

app.get("/getdados",(req,res)=>{
    let SQL = "SELECT * FROM controle_financeiro"
    db.query(SQL, (err,response)=>{
        if(err) console.log(err)
        if(response) res.send(response)
    })
})

app.post("register", (req,res)=>{
    const {data} = req.body;
    const {descricao} = req.body;
    const {valor} = req.body;
    const {condicao} = req.body;

    SQL = "INSERT INTO controle_fincanceiro () values (?,?,?,?)"
    db.query(SQL,[data,descricao,valor,condicao], (err,result)=>{
       console.log(err) 
    })
})

app.listen(port, ()=>{console.log('rodando')});