import { getClinic } from '../weiClinic'

describe('WeiClinic', () => {

    test('WeiClinic constructor', () => {
        const expectedResult = {
            envelopes : [],
            stacks : []
        }

        const actualResult = new getClinic
        expect(expectedResult).toEqual(actualResult)
    })

    test('create function',() => {
        const getNewId = jest.fn().mockReturnValue(1)
       
        const CorticalStack = {
            id : getNewId(),
            realGender : "F",
            name : "abc",
            age : "11",
            idEnvelope: getNewId()
        }

        const Envelope = {
            id: getNewId(),
            gender : "F",
            age : "11",
            idStack : getNewId()
        }

        const expectedResult = {
            corticalStack: CorticalStack,
            envelope: Envelope
        }
        const actualResult = getClinic().create("F","abc","11")
        expect(expectedResult).toEqual(actualResult)
    })


})