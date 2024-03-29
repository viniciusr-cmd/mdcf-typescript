import { test, expect, describe, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import { UserModel } from '../db/users';
import { get } from 'lodash';

// Create testuser from the database before running the spec if it does not exist
const username = 'testuser'

beforeAll(async () => {
    await UserModel.findOneAndDelete({ username });
    await request(app)
        .post('/auth/register')
        .send({
            username: username,
            password: 'testpassword'
        })
});

describe('User Login', () => {
    test('POST /auth/login - should login a user and return 200 status', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: username,
                password: 'testpassword'
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('authentication.sessionToken')
    })

    test('POST /auth/login - should return 400 status for incorrect credentials', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            })
        expect(res.statusCode).toBe(400)
    })

    test('POST /auth/login - should return 403 for a distinct password in database that is invalid', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'invalidpassword'
            })
        expect(res.statusCode).toBe(403)
    })
})