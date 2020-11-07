import { getClinic } from '../weiClinic'

describe('WeiClinic', () => {

    test('WeiClinic constructor', () => {
        const expectedResult = {
            envelopes : [],
            stacks : []
        }

        const actualResult = new getClinic
        expect(actualResult).toEqual(expectedResult)
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
        expect(actualResult).toEqual(expectedResult)
    })

    test('Remove function, If ID can be found and implanted ',() => {

        getClinic().envelopes = [ {id: 1, idStack: 1} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 1} ]

        const removed = getClinic().removeStackFromEnvelope(1)
        expect(null).toBe(getClinic().stacks[0].idEnvelope)
        expect(null).toBe(getClinic().envelopes[0].idStack)
        expect(1).toBe(getClinic().envelopes.length)
        expect(1).toBe(getClinic().stacks.length)
        expect(removed).toBeTruthy
    })

    test('Remove function, If ID can be found but not implanted ',() => {

        getClinic().envelopes = [ {id: 1, idStack: null} ]
        getClinic().stacks = [ {id: 1, idEnvelope: null} ]

        const removed = getClinic().removeStackFromEnvelope(1)
        expect(1).toBe(getClinic().envelopes.length)
        expect(1).toBe(getClinic().stacks.length)
        expect(removed).toBeFalsy
    })

    test('Remove function, If ID can not be found',() => {

        getClinic().envelopes = [ {id: 1, idStack: 1} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 1} ]

        const removed = getClinic().removeStackFromEnvelope(2)
        expect(1).toBe(getClinic().stacks[0].idEnvelope)
        expect(1).toBe(getClinic().envelopes[0].idStack)
        expect(1).toBe(getClinic().envelopes.length)
        expect(1).toBe(getClinic().stacks.length)
        expect(removed).toBeFalsy
    })

    test('assignStackToEnvelope function, If idStack cannot be found and envelope id is not given',() => {

        getClinic().envelopes = [ {id: 1, idStack: 1} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 1} ]

        const implant = getClinic().assignStackToEnvelope(2,)
        expect(getClinic().stacks[0].idEnvelope).toBe(1)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(getClinic().envelopes.length).toBe(1)
        expect(getClinic().stacks.length).toBe(1)
        expect(implant).toBe('2')
    })

    test('assignStackToEnvelope function, If idStack found but is not avaliable envelope id is not given',() => {

        getClinic().envelopes = [ {id: 1, idStack: 1} ]
        getClinic().stacks = [ {id: 1, idEnvelope: 1} ]

        const implant = getClinic().assignStackToEnvelope(1,NaN)
        expect(getClinic().stacks[0].idEnvelope).toBe(1)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(getClinic().envelopes.length).toBe(1)
        expect(getClinic().stacks.length).toBe(1)
        expect(implant).toBe('2')
    })

    test('assignStackToEnvelope function, If idStack found, avaliable but envelope id is not passed',() => {

        getClinic().envelopes = [ {id: 1, name:'johndoe', idStack: null} ]
        getClinic().stacks = [ {id: 1,name:'johndoe', idEnvelope: null} ]

        const implant = getClinic().assignStackToEnvelope(1,NaN)
        expect(getClinic().stacks[0].idEnvelope).toBe(1)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(getClinic().envelopes.length).toBe(1)
        expect(getClinic().stacks.length).toBe(1)
        expect(implant).toBe('1')
    })

    test('assignStackToEnvelope function, If idStack found, avaliable but envelope id is not found',() => {

        getClinic().envelopes = [ {id: 1, name:'johndoe', idStack: null} ]
        getClinic().stacks = [ {id: 1,name:'johndoe', idEnvelope: null} ]

        const implant = getClinic().assignStackToEnvelope(1,2)
        expect(getClinic().stacks[0].idEnvelope).toBe(null)
        expect(getClinic().envelopes[0].idStack).toBe(null)
        expect(getClinic().envelopes.length).toBe(1)
        expect(getClinic().stacks.length).toBe(1)
        expect(implant).toBe('3')
    })

    test('assignStackToEnvelope function, If idStack found, avaliable and  envelope id is found and not avaliable',() => {

        getClinic().envelopes = [ {id: 1, name:'johndoe', idStack: 1} ]
        getClinic().stacks = [ {id: 1,name:'johndoe', idEnvelope: null} ]

        const implant = getClinic().assignStackToEnvelope(1,1)
        expect(getClinic().stacks[0].idEnvelope).toBe(null)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(getClinic().envelopes.length).toBe(1)
        expect(getClinic().stacks.length).toBe(1)
        expect(implant).toBe('2')
    })

    test('assignStackToEnvelope function, If idStack found, avaliable and  envelope id is found, avaliable',() => {

        getClinic().envelopes = [ {id: 1, name:'johndoe', idStack: null} ]
        getClinic().stacks = [ {id: 1,name:'johndoe', idEnvelope: null} ]

        const implant = getClinic().assignStackToEnvelope(1,1)
        expect(getClinic().stacks[0].idEnvelope).toBe(1)
        expect(getClinic().envelopes[0].idStack).toBe(1)
        expect(getClinic().envelopes.length).toBe(1)
        expect(getClinic().stacks.length).toBe(1)
        expect(implant).toBe('1')
    })

    test('Kill Envelope with stack', () => {
        const expectedResult = true
        //const weiClinic = getClinic()
        getClinic().envelopes = [ {id: 1, idStack: 2} ]
        getClinic().stacks = [ {id: 2, idEnvelope: 1} ]


        const actualResult = getClinic().killEnvelope(1)

        expect(actualResult).toBe(expectedResult)
        console.log("RESULT = " + getClinic().envelopes)
        expect(0).toBe(getClinic().envelopes.length)
        expect(null).toBe(getClinic().stacks[0].idEnvelope)
    })

    test('Kill Envelope without stack', () => {
        const expectedResult = true
        //const weiClinic = getClinic()
        getClinic().envelopes = [ {id: 1, idStack: null} ]

        const actualResult = getClinic().killEnvelope(1)

        expect(actualResult).toBe(expectedResult)
        expect(0).toBe(getClinic().envelopes.length)
    })

    test('Attempt to Kill nonexisting Envelope', () => {

        const expectedResult = false
        getClinic().envelopes = []

        const actualResult = getClinic().killEnvelope(1)

        expect(actualResult).toBe(expectedResult)

    })

    test('True death to stack implanted in envelope', () => {
        const expectedResult = true

        getClinic().envelopes = [ {id: 1, idStack: 2} ]
        getClinic().stacks = [ {id: 2, idEnvelope: 1} ]

        const actualResult = getClinic().destroyStack(2)

        expect(actualResult).toBe(expectedResult)
        expect(0).toBe(getClinic().envelopes.length)
        expect(0).toBe(getClinic().stacks.length)
    })

})
