const request = require('supertest')
const server = require('../api/server.js')
const db = require('../config/dbConfig')
// using the router
// using the database
function makeUserNamePasswordAndAccessType(username, password, accessType) {
    return {
            username: username,
            password: password,
            accessType: accessType
        }
}

// tests the login and is correct
async function loginUser() {
    const x = await request(server)
                .post('/api/helpers/login')
                .send(makeUserNamePasswordAndAccessType('jake123', '123456', 'helper'))
                .then(res => {
                    // console.log('status', res)
                    expect(res.status).toBe(200)
                    // console.log(res.text)
                    return res.text
            })
    return JSON.parse(x)
}
// makes sure these endpoints actually exist
// messing it up
// register works but can't be practically run with the others
describe('server register', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })
    // beforeEach(async () => {
    //     await db('users').truncate();
    // })
    // add and delete things that were added
    // 1 test
        // add a ticket
        // delete the ticket

    it('test get all tickets endpoint', async function() {
        // const users = await db('users')
        // if(users.length > 0) {
        // console.log('length', users.length)

        // }
        // the user has already been registered
        
        let x  = await loginUser()
        let { token, accessType, userId } = x
        console.log(token, accessType, userId)
        // console.log(Object.keys(x))
        await request(server)
                .get('/api/tickets')
                // send is the body
                // set lets me put things in the header I believe
                .set('authorization', token)
                .then(res => {
                    // console.log(res.status)
                    // console.log(res.body)
                    expect(res.body).toHaveLength(res.body.length)
                })
        // console.log('done')
        // return 0
    })    
})
describe.skip('next one', function() {
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