import { test, expect, describe, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import { UserModel } from '../db/users';

// Delete testuser from the database before running the spec
const username = 'testuser'
beforeAll(async () => {
    await UserModel.findOneAndDelete({ username });
});

describe('User Registration', () => {
    test('POST /auth/register - should create a new user and return 201 status', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: username,
                password: 'testpassword'
            })
        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('_id')
    })

    test('POST /auth/register - should return 400 status for missing parameters', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                username: "incorrectUser",
            })
        expect(res.statusCode).toBe(400)
    })
})