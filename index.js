import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb'

import 'dotenv/config'
console.log("??????")
const app = express()
app.use(cors())
app.use(express.json())

//console.log(process.env.MONGO_URI)
const client = new MongoClient(process.env.MONGO_URI)
;
const db = client.db('login-app-deb')

async function signUp(req, res) {
     const newUser = req.body
    await db.collection('users').insertOne(newUser)
    res.status(201).send({ message: 'User signed up' })
  }

async function login(req, res) {
    console.log("REQUEST",req.body)
    const { email, password } = req.body
    const user = await db.collection('users').findOne({ email: email })
    if (user?.email === email && user?.password === password) {
        console.log("success")
        res.status(200).send({ message: 'You are Logged in',success:true})
    } else {
        res.status(400).send({ message: "No user"})         
    }
}

app.post('/users', signUp)
app.post('/users/login', login)

app.listen(8080, () => console.log('Api listening on port 8080 😎'))


