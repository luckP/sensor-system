/**
 * Main server application for managing machines and sensors in an industrial environment.
 * This application provides APIs for CRUD operations on machines and sensors,
 * as well as an AdminBro interface for managing the data.
 * The server is initialized using Express.js framework.
 * @module app
 */


import  express from 'express';
import cors from 'express-cors';
import dotenv from 'dotenv';

// import logger config
import { infoLogger } from './logger.js';

// Import database connection to test connection
import  conn from './db.js';

// Import adminjs setup
import { admin, adminRouter} from './adminJsSetup.js';

// Import the sensor data router
import router from './routers/index.js';

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

/**
 * Starts the server and initializes routes and middleware.
 * @function start
 */
const start = async () => {
  // Initialize Express application
  const app = express();

  // Middleware for logging requests
  app.use((req, res, next) => {
    infoLogger.info(`${req.method} ${req.url}`);
    next();
  });

  // Middleware for parsing JSON request bodies
  app.use(express.json());

  // Middleware for enabling CORS
  app.use(cors());

  // Mount all routes defined in the index.js file
  app.use('/api', router);

  //  Mount admin page
  app.use(admin.options.rootPath, adminRouter);

  // Route for handling GET requests to the root URL ("/")
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
