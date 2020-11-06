import { getNewId } from './idHelper'
import CorticalStack from './corticalStack'
import Envelope from './Envelope'

class WeiClinic {
    constructor() {
        this.envelopes = []
        this.stacks = []
    }

    create(realGender, name, age) {
        const stackId = getNewId(this.stacks)
        const envelopeId = getNewId(this.envelopes)
        const newStack = new CorticalStack(stackId, realGender, name, age, envelopeId)
        const newEnvelope = new Envelope(envelopeId, realGender, age, stackId)

        this.stacks.push(newStack)
        this.envelopes.push(newEnvelope)

        return {
            corticalStack: newStack,
            envelope: newEnvelope
        }
    }

    assignStackToEnvelope(idStack, idEnvelope) {
        this.envelopes.find(envelope => envelope.id === idEnvelope).idStack = idStack
    }

    removeStackFromEnvelope(idStack) {

        for(let i=0; i < this.stacks.length; i++){
            if(this.stacks[i].id === idStack){
                for(let j=0; j < this.envelopes.length; j++){
                    if(this.envelopes[j].id === this.stacks[i].idEnvelope){
                        this.envelopes[j].idStack = null  
                    }
                }
                this.stacks[i].idEnvelope = null
                return true
            }
        }
        return false
    }



    killEnvelope(idEnvelope) {

        for(let i=0; i < this.envelopes.length; i++){
            if(this.envelopes[i].id === idEnvelope){
                if(this.envelopes[i].idStack != null){
                    const stackId = this.envelopes[i].idStack
                    for(let j=0; j < this.stacks.length; j++){
                        if(stacks[j].id == stackId){
                            this.stacks[j].envelopeId = null
                            break
                        }
                    }
                }
                this.envelopes.splice(i,1)
                break;
            }
        }

    }

    destroyStack(idStack) {

    }
}

const weiClinic = new WeiClinic()

export const getClinic = () => weiClinic
