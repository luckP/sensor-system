import express from 'express';
import sensorDataRouter from './sensorDataRouter.js';
import machineRouter from './machineRouter.js';
import sensorRouter from './sensorRouter.js';
// Import other routers as needed

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the api');
});

// Mount each router under its respective path
router.use('/sensor-data', sensorDataRouter);
router.use('/machine', machineRouter);
router.use('/sensor', sensorRouter);
// Mount other routers here


export default router;