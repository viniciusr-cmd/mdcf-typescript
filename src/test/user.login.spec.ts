import { test, expect, describe, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import { UserModel } from '../db/users';

// Create testuser from the database before running the spec if it does not exist
const username = 'testuser'
let sessiontoken = ''

beforeAll(async () => {
    await UserModel.findOneAndDelete({ username });
    await request(app)
        .post('/auth/register')
        .send({
            username: username,
            password: 'testpassword'
        })
        // Get session token in body
        .then((res) => {
            sessiontoken = res.body.authentication.sessionToken
        })
    console.log(sessiontoken)
});

describe('User Login', () => {
    test('POST /auth/login - should login a user and return 200 status', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .set('Cookie', `sessionToken=${sessiontoken}`)
            .send({
                username: username,
                password: 'testpassword'
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('authentication.sessionToken')
    })

    test('POST /auth/login - should return 401 status for incorrect credentials', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .set('Cookie', `sessionToken=${sessiontoken}`)
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            })
            console.log(res.text)
        expect(res.statusCode).toBe(401)
    })

    test('POST /auth/login - should return 403 for token that is invalid', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .set('Cookie', `${sessiontoken}1234`)
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
        expect(res.statusCode).toBe(403)
    })
})