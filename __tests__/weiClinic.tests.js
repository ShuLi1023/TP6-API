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

    test('Create Function',() => {
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



    test('Kill Envelope with stack', () => {
        const expectedResult = true
        //const weiClinic = getClinic()
        getClinic().envelopes = [ {id: 1, idStack: 2} ]
        getClinic().stacks = [ {id: 2, idEnvelope: 1} ]


        const actualResult = getClinic().killEnvelope(1)

        expect(expectedResult).toBe(actualResult)
        console.log("RESULT = " + getClinic().envelopes)
        expect(0).toBe(getClinic().envelopes.length)
        expect(null).toBe(getClinic().stacks[0].idEnvelope)
    })

    test('Kill Envelope without stack', () => {
        const expectedResult = true
        //const weiClinic = getClinic()
        getClinic().envelopes = [ {id: 1, idStack: null} ]

        const actualResult = getClinic().killEnvelope(1)

        expect(expectedResult).toBe(actualResult)
        expect(0).toBe(getClinic().envelopes.length)
    })

        test('Attempt to Kill nonexisting Envelope', () => {

            const expectedResult = false
            getClinic().envelopes = []

            const actualResult = getClinic().killEnvelope(1)

            expect(expectedResult).toBe(actualResult)

        })

})