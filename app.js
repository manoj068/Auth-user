const express = require('express')
const sql = require('mysql')
const path = require('path')
const file = require('express-fileupload')

const app = express()

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manoj@99',
    database: 'AUTH_USER'
});

const publicDirectory = path.join(__dirname, './public')

app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');

db.connect((err) => {
    if (err) console.log(err)
    else {
        console.log("Connected")
    }
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/vote', (req,res)=>{
    res.render('login')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/features',(req,res)=>{
    res.render('process')
})

app.get('/auth', async (req, res) => {

    const { id, name, email, ids,ipfs } = req.query;
    console.log("ID is", id);
    console.log("Name is", name);
    console.log("Email is", email);
    console.log("Hash is ",ipfs)
    db.query(`SELECT voter_id,ipfs_hash FROM USER WHERE ipfs_hash=? and voter_id=?;`,[ipfs,id],async (err,result,fields)=>{
        console.log("Result is ",result)
        if(result.length > 0){   
            res.redirect('http://localhost:3000/')
        }
        else
        {
            res.render('error');
        }
    })

})

app.listen(5000, () => {
    console.log("Server is Running")
})