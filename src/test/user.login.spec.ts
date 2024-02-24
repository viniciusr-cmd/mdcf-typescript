import { test, describe } from 'vitest'
import request from 'supertest'
import { app } from '../index'

describe('User Login', () => {
    test('POST /auth/login - should login a user and return 200 status', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('authentication.sessionToken')
    })

    test('POST /auth/login - should return 401 status for incorrect credentials', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            })
        expect(res.statusCode).toBe(401)
    })

    test('POST /auth/login - should return 403 for token that is invalid', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .set('Cookie', 'sessionToken=invalidToken')
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
        expect(res.statusCode).toBe(403)
    })
})