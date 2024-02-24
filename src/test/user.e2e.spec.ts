import { test, expect, describe, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import { UserModel } from '../db/users';
import { get } from 'lodash';

// Delete testuser from the database before running the spec
const username = 'testuser'

beforeAll(async () => {
    await UserModel.findOneAndDelete({ username });
});

// Get user ID
let userId = ''
let cookies = ''
// ------------------------------ USER REGISTRATION ------------------------------
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

// ------------------------------ USER LOGIN ------------------------------
describe('User Login', () => {
    test('POST /auth/login - should login a user and return 200 status', async ({ expect }) => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
        cookies = get(res, 'header.set-cookie')[0];
        userId = get(res, 'body._id');
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

// ------------------------------ USER UPDATE ------------------------------
describe('User Update', () => {
    test('PATCH /users/:id - should update a user and return 200 status', async ({ expect }) => {
        const res = await request(app)
            .patch(`/users/${userId}`)
            .set('Cookie', `${cookies}`)
            .send({
                username: 'TESTUSERUPDATED'
            })

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('username')
    })

    test('PATCH /users/:id - should return 403 status for forbidden update', async ({ expect }) => {
        const unauthorizedUserId = Math.random().toString(36).substring(7)
        const res = await request(app)
            .patch(`/users/${unauthorizedUserId}`)
            .send({
                username: 'updatedUser',
            })
        expect(res.statusCode).toBe(403)
    })
})

// ------------------------------ USER DELETE ------------------------------
describe('User Deletion', () => {
    test('DELETE /users/:id - should delete a user and return 204 status', async ({ expect }) => {
        const res = await request(app)
            .delete(`/users/${userId}`)
            .set('Cookie', `${cookies}`)
        expect(res.statusCode).toBe(204)
    })
})