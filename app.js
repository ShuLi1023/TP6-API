import express from 'express'
import bodyParser from 'body-parser'

import {getClinic} from './weiClinic'

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/digitize', (req, res) => {
    // Retrieve gender, age and name
    const gender = req.query.gender
    const name = req.query.name
    const age = req.query.age

    const createdElements = getClinic().create(gender, name, age)

    console.log(createdElements)
    res.status(200).set({ 'Content-Type': 'application/json' }).json(createdElements)
})

app.post('/remove/:stackId', (req, res) => {
    const stackId = parseInt(req.params.stackId)

    const removed = getClinic().removeStackFromEnvelope(stackId)

    if(removed){
        res.status(204).end()
    }else{
        res.status(400).end()
    }
    
})

export default app