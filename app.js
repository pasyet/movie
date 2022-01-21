require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./router/index')
var cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(router)

app.listen(port, ()=>{
    console.log(`App listening on port https://localhost:${port}`);
})