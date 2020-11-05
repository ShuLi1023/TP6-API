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
    console.log(removed)
    console.log(getClinic().envelopes)
    if(removed){
        res.status(204).end()
    }else{
        res.status(400).end()
    }
    
})

app.put('/implant/:stackId/:envelopeId?', (req, res) => {
    const stackId = parseInt(req.params.stackId)
    const envelopeId = parseInt(req.params.envelopeId)
    const findStack = getClinic().stacks.find(stack => stack.id === stackId)
    if(findStack){
        const isStackAvaliable = findStack.idEnvelope === null
        if(!isStackAvaliable)
        {
            res.status(400).end()
        } 
    }
    else{
        res.status(400).end()
    }
    if(!Number.isNaN(envelopeId)){
        const findEnvelope = getClinic().envelopes.find(envelope => envelope.id === envelopeId)
        if(!findEnvelope){
            res.status(404).end()
        }
        getClinic().assignStackToEnvelope(stackId, envelopeId)
        console.log(getClinic().envelopes)
        res.status(204).end()
    }
    else {
        const availableEnvelope = getClinic().envelopes.find(envelope => envelope.idStack === null)
        if (availableEnvelope) {
            getClinic().assignStackToEnvelope(stackId, availableEnvelope.id)
            console.log(getClinic().envelopes)
            res.status(204).end()
        } else {
            res.status(400).end()
        }
    }  
})

export default app
