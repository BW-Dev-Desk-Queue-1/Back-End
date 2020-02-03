const request = require('supertest')
const server = require('./server.js')
const db = require('../database/dbConfig')

function makeUserNamePasswordAndAccessType(username, password, accessType) {

}
// makes sure these endpoints actually exist
// messing it up
describe('server register', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('test register endpoint', async function() {
        // const users = await db('users')
        // if(users.length > 0) {
        // console.log('length', users.length)

        // }
        const x = await request(server)
                .post('/api/auth/register')
                .send(makeUserNamePasswordAndAccessType())
                .then(res => {
                    // console.log('status', res.status)
                    expect(res.status).toBe(201)
            })
        return x
    })    
})
describe('next one', function() {
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('test register model', async function() {
        const users1 = await db('users')

        console.log('length', users1.length)

        await db('users')
            .insert({
                username: 'test',
                password: 'password'})
        const users = await db('users')

        expect(users).toHaveLength(1)
    })
})

describe.skip('the next one', function() {
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('test register and login endpoint', function() {
        return request(server)
                .post('/api/auth/register')
                .send({
                        username: 'test',
                        password: 'password'})
                .then(res => {
                    // console.log('status', res.status)
                    if(res.status === 201) {
                        return request(server)
                            .post('/api/auth/login')
                            .send({
                                username: 'test',
                                password: 'password'})
                            .then(res => {
                                expect(res.status).toBe(200)
                            })
                    }
                    expect(res.status).toBe(201)
            })
    })
    
})

describe.skip('the last one', function() {
    beforeEach(async () => {
        await db('users').truncate();
    })
    it('test register and login model', async function() {
        await db('users')
            .insert({
                username: 'test',
                password: 'password'})
        const users = await db('users')
        if(users.length === 1) {
            const users = await db('users')
                        .where('id', 1)
            expect(users).toHaveLength(1)
            
        }
        // expect(users).toHaveLength(1)
    })
})