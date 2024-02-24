import express from 'express';
import { get, merge } from 'lodash';
import { getUsersBySessionToken } from '../db/users';

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Get user from request
        const user = get(req, 'identity.id') as string;
        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        // Get user ID from request
        const userId = get(req, 'params.id');
        if (user !== userId) {
            return res.status(401).send('Unauthorized');
        }

        return next();
    }
    catch (error) {
        res.status(500).send('Error checking user ownership');
    }
}

// Middleware to check if user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Get session token from request
        const sessionToken = get(req, 'cookies.sessionToken');
        if (!sessionToken) {
            return res.status(403).send('Forbidden');
        }

        // Get user by session token
        const user = await getUsersBySessionToken(sessionToken);
        if (!user) {
            return res.status(403).send('Forbidden');
        }

        // Set user on request
        merge(req, { identity: user });
        return next();
    }
    catch (error) {
        res.status(500).send('Error authenticating user');
    }
}
