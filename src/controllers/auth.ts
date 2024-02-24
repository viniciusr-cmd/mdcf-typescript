import express from "express";
import { createUser, getUsersByUsername } from "../db/users";
import { generateSalt, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(401).send('Invalid username or password');
        }

        // If token is invalid, return 403
        if (!req.cookies.sessionToken) {
            return res.status(403).send('Invalid session token');
        }

        // Check if user exists
        const user = await getUsersByUsername(username).select('+authentication.password +authentication.salt +authentication.sessionToken');
        if (!user) {
            return res.status(401).send('User does not exist, please check and try again.');
        }

        // Check if password is correct
        const userPassword = user.authentication.password;

        // Compare password with expected password
        const expectedPassword = authentication(user.authentication.salt, password);
        if (userPassword !== expectedPassword) {
            return res.status(400).send('Invalid password, please check and try again.');
        }

        // Generate salt and sessiontoken
        const salt = generateSalt();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        // Save user
        await user.save();

        // Set cookie
        res.cookie('sessionToken', user.authentication.sessionToken, {domain: 'localhost', path: '/'});

        // Return user
        return res.status(200).json(user).end();
    }
    catch (error) {
        res.status(500).send('Error logging in');
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
    // Extract username and password from request body
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Invalid username or password');
    }
   
    // Check if user already exists
    const existingUser = await getUsersByUsername(username);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Create user
    const salt = generateSalt();
    const user = await createUser({ username, authentication: { password: authentication(salt, password), salt } });
    return res.status(201).json(user).end();
} catch (error) {
        res.status(500).send('Error creating user');
}
}