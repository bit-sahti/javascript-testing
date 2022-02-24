const { describe, it } = require('mocha')
const request = require('supertest')
const { deepStrictEqual } = require('assert')

const app = require('./api')

describe('API test suite', () => {
    describe('/contact', () => {
        it('should request the contact page and status code 200', async () => {
            const response = await request(app).get('/contact').expect(200)

            deepStrictEqual(response.text, 'Contact us page')
        })

        it('should return status 401 if login is wrong', async () => {
            const response = await request(app).post('/login').send({
                id: 2,
                password: 'pass123'
            }).expect(401)

            deepStrictEqual(response.text, 'Unauthorized.')
        })

        it('should return status 401 if password is wrong', async () => {
            const response = await request(app).post('/login').send({
                id: 1,
                password: 'pass12653'
            }).expect(401)

            deepStrictEqual(response.text, 'Unauthorized.')
        })

        it('should return 200 if login succeeds', async() => {
            const response = await request(app).post('/login').send({
                id: 1,
                password: 'pass123'
            }).expect(200)

            deepStrictEqual(response.text, 'Login succeeded.')
        })
    })

    describe('default route', () => {
        it('should redirect to landing page if path is unknown', async() => {
            const response1 = await request(app).put('/login').expect(200)
            const response2 = await request(app).get('/route').expect(200)

            deepStrictEqual(response1.text, 'Hello World')
            deepStrictEqual(response2.text, 'Hello World')
        })
    })
})