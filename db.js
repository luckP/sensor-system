/**
 * Module responsible for establishing a connection to the MongoDB database using Mongoose.
 * It reads the MongoDB URI from the environment variables specified in the .env file.
 * @module db
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGODB_URI, {});

/**
 * Represents the MongoDB connection instance.
 * @type {mongoose.Connection}
 */
const conn = mongoose.connection;

/**
 * Event handler for successful database connection.
 * Logs a message to the console indicating successful connection.
 * @event open
 */
conn.once('open', () => console.log('Connected to MongoDB'));

/**
 * Event handler for database connection errors.
 * Logs error details to the console if there's an error connecting to the database.
 * @event error
 * @param {Error} err - The error object containing details about the connection error.
 */
conn.on('error', (err) => console.log('Error connecting to MongoDB:', err));

export default conn;
