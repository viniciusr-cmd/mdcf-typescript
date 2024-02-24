import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type : String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, required: true, select: false},
        sessionToken: {type: String, select: false},
    }
});

export const UserModel = mongoose.model('User', UserSchema);

// Built-in method to get all users
export const getUsers = () =>
    UserModel.find()

// Built-in method to get user by username
export const getUsersByUsername = (username: string) =>
    UserModel.findOne({ username }).select('+authentication.password +authentication.salt +authentication.sessionToken')

// Built-in method to get user by session token
export const getUsersBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'authentication.sessionToken': sessionToken }).select('+authentication.password +authentication.salt +authentication.sessionToken')

// Built-in method to get user by ID
export const getUserByID = (id: string) =>
    UserModel.findById(id).select('+authentication.password +authentication.salt +authentication.sessionToken')

// Built-in method to create a new user
export const createUser = (values: Record<string, any>) => 
    new UserModel(values).save().then((user) => user.toObject());

// Built-in method to delete a user by ID
export const deleteUserById = (id: string) =>
    UserModel.findOneAndDelete({ _id: id });

// Built-in method to update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
