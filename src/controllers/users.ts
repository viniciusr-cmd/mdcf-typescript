import express from 'express';
import { getUsers, deleteUserById, updateUserById, getUserByID } from '../db/users';

// Get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).send('Error getting users');
    }
}
// Delete user
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        // Get user ID from request
        const { id } = req.params;

        // Delete only if user exists
        const user = await deleteUserById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        return res.status(204).json(user);
    }
    catch (error) {
       return res.status(400).send('Error deleting user');
    }
}

// Update user
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).send('Invalid username');
        }

        const user = await getUserByID(id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.username = username;
        await user.save();

        res.status(200).json(user).end();
    }
    catch (error) {
        res.status(400).send('Error updating user');
    }
}