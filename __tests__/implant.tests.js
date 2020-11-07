import request from 'supertest'
import app from '../app'

import * as clinicDependency from '../weiClinic'

beforeEach(() => {
    clinicDependency.getClinic = jest.fn().mockReturnValue({
        assignStackToEnvelope: jest.fn()
    })
})

describe('Implant Feature', () => {
    test('When Stack ID cannot be found and Envelope is not  given', (done) => {
        const assignStackToEnvelope = jest.fn().mockReturnValue('2')

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })
        request(app)
            .put('/implant/7')
            .expect(()=>{
                expect(assignStackToEnvelope).toBeCalledTimes(1)
                expect(assignStackToEnvelope).toHaveBeenCalledWith(7,NaN)
            })
            .expect(400)
            .end(done)
    })

    test('When Stack ID can be found but not avaliable and Envelope is not  given', (done) => {
        const assignStackToEnvelope = jest.fn().mockReturnValue('2')

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })
        request(app)
            .put('/implant/7')
            .expect(()=>{
                expect(assignStackToEnvelope).toBeCalledTimes(1)
                expect(assignStackToEnvelope).toHaveBeenCalledWith(7,NaN)
            })
            .expect(400)
            .end(done)
    })

    test('When Stack ID can be found,Avaliable and Envelope is not given but there are free envelopes', (done) => {
        const assignStackToEnvelope = jest.fn().mockReturnValue('1')

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })
        request(app)
            .put('/implant/7')
            .expect(()=>{
                expect(assignStackToEnvelope).toBeCalledTimes(1)
                expect(assignStackToEnvelope).toHaveBeenCalledWith(7,NaN)
            })
            .expect(204)
            .end(done)
    })

    test('When Stack ID can be found and Envelope is cannot found', (done) => {
        const assignStackToEnvelope = jest.fn().mockReturnValue('3')

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })
        request(app)
            .put('/implant/7/1')
            .expect(()=>{
                expect(assignStackToEnvelope).toBeCalledTimes(1)
                expect(assignStackToEnvelope).toHaveBeenCalledWith(7,1)
            })
            .expect(404)
            .end(done)
    })

    test('When Stack ID can be found and Envelope is can be found but not avaliable', (done) => {
        const assignStackToEnvelope = jest.fn().mockReturnValue('2')

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })
        request(app)
            .put('/implant/7/1')
            .expect(()=>{
                expect(assignStackToEnvelope).toBeCalledTimes(1)
                expect(assignStackToEnvelope).toHaveBeenCalledWith(7,1)
            })
            .expect(400)
            .end(done)
    })

    test('When Stack ID can be found and Envelope is can be found, avaliable', (done) => {
        const assignStackToEnvelope = jest.fn().mockReturnValue('1')

        clinicDependency.getClinic.mockReturnValue({
            assignStackToEnvelope
        })
        request(app)
            .put('/implant/7/1')
            .expect(()=>{
                expect(assignStackToEnvelope).toBeCalledTimes(1)
                expect(assignStackToEnvelope).toHaveBeenCalledWith(7,1)
            })
            .expect(204)
            .end(done)
    })
})