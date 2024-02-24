import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose, { mongo } from 'mongoose';
import compression from 'compression';
import router from './router';

export const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression())
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on port http://localhost:8000/');
});

// Connect to MongoDB

// Replace with your MongoDB URI
const MONGO_URI = 'mongodb+srv://admin:iBGvK7dlizctBFrO@cluster0.wkoqtx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB: ', error);
    process.exit();
});

app.use('/', router());