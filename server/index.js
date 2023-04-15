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
    let SQL = "SELECT * FROM heroku_097b4127bff040d.controle_financeiro"
    db.query(SQL, (err,response)=>{
        if(err) console.log(err)
        if(response) res.send(response)
    })
})

app.post("/register", (req,res)=>{
    console.log(req.body)
    const {data} = req.body;
    const {descricao} = req.body;
    const {valor} = req.body;
    const {condicao} = req.body;

    SQL = "INSERT INTO heroku_097b4127bff040d.controle_financeiro (data,descricao,valor,condicao) VALUES (?,?,?,?)"
    db.query(SQL,[data,descricao,valor,condicao], (err,result)=>{
       console.log(err) 
    })
})
app.put("/edit", (req,res)=>{
    const {id} = req.body
    const {data} = req.body;
    const {descricao} = req.body;
    const {valor} = req.body;
    const {condicao} = req.body;
    
    let SQL = "UPDATE heroku_097b4127bff040d.controle_financeiro SET data = ?, descricao = ?, valor = ?, condicao = ? WHERE id = ?"
db.query(SQL,[data,descricao,valor,condicao,id],(err,result)=>{
    if(err)console.log(err)
    else res.send(result)
})
})

app.delete('/delete/:id', (req,res)=>{
    const {id} = req.params;
    let SQL = "DELETE FROM heroku_097b4127bff040d.controle_financeiro WHERE id = ?";
    db.query(SQL,[id],(err,result)=>{
        if(err){console.log(err)}
        else{res.send(result)}
    })
})

app.listen(port, ()=>{console.log('rodando')});