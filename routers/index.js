import express from 'express';
import sensorDataRouter from './sensorDataRouter.js';
// Import other routers as needed

const router = express.Router();

// Mount each router under its respective path
router.use('/sensor-data', sensorDataRouter);
// Mount other routers here

export default router;