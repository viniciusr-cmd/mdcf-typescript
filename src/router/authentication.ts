import express from 'express';
import { register, login } from '../controllers/auth';

// Auth routes
export default (router: express.Router): express.Router => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    return router;
}