

import express from 'express';
import { body, param, validationResult } from 'express-validator';
import Sensor from '../models/sensor.js';
import { errorLogger } from '../logger.js';

const router = express.Router();

/**
 * Route: POST /sensors
 * Description: Create a new sensor entry
 * Request Body:
 *  - name: String (required)
 *  - unitOfMeasurement: String (required)
 *  - minValue: Number (required)
 *  - maxValue: Number (required)
 *  - machine: MongoDB ObjectId (required)
 */
router.post('/',
    // Validation middleware using express-validator
    body('name').isString(),
    body('unitOfMeasurement').isString(),
    body('minValue').isNumeric(),
    body('maxValue').isNumeric(),
    body('machine').isMongoId(),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const sensor = new Sensor(req.body);
            await sensor.save();
            res.status(201).json(sensor);
        } catch (error) {
            errorLogger.error(`${req.method} ${req.url} ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    });

/**
 * Route: GET /sensors
 * Description: Retrieve all sensor entries
 */
router.get('/', async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.status(201).json(sensors);
    } catch (error) {
        errorLogger.error(`${req.method} ${req.url} ${error.message}`);
        res.status(500).json({ message: error.message });
    }

});

/**
 * Route: GET /sensors/:id
 * Description: Retrieve a specific sensor entry by ID
 * Request Params:
 *  - id: MongoDB ObjectId (required)
 */
router.get('/:id', async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            errorLogger.error(`${req.method} ${req.url} Sensor entry not found`);
            return res.status(404).json({ message: 'Sensor entry not found' });
        }
        res.json(sensor);
    } catch (error) {
        errorLogger.error(`${req.method} ${req.url} ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

/**
 * Route: PATCH /sensors/:id
 * Description: Update a sensor entry by ID
 * Request Params:
 *  - id: MongoDB ObjectId (required)
 * Request Body:
 *  - name: String
 *  - unitOfMeasurement: String
 *  - minValue: Number
 *  - maxValue: Number
 *  - machine: MongoDB ObjectId
 */
router.patch('/:id',
    body('name').optional().isString(),
    body('unitOfMeasurement').optional().isString(),
    body('minValue').optional().isNumeric(),
    body('maxValue').optional().isNumeric(),
    body('machine').optional().isMongoId(), async (req, res) => {
        try {
            const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!sensor) {
                errorLogger.error(`${req.method} ${req.url} Sensor entry not found`);
                return res.status(404).json({ message: 'Sensor entry not found' });
            }
            res.json(sensor);
        } catch (error) {
            errorLogger.error(`${req.method} ${req.url} ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    });

/**
 * Route: DELETE /sensors/:id
 * Description: Delete a sensor entry by ID
 * Request Params:
 *  - id: MongoDB ObjectId (required)
 */
router.delete('/:id', async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            errorLogger.error(`${req.method} ${req.url} Sensor entry not found`);
            return res.status(404).json({ message: 'Sensor entry not found' });
        }
        res.json({ message: 'Sensor entry deleted successfully' });
    } catch (error) {
        errorLogger.error(`${req.method} ${req.url} ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

/**
 * Route: GET /sensors/:sensorId/sensor-data
 * Description: Retrieve sensor data for a specific sensor ID
 * Request Params:
 *  - sensorId: MongoDB ObjectId (required)
 */
router.get('/:machineId/sensor',
    async (req, res) => {
        const machineId = req.params.machineId;
        try {
            const sensors = await Sensor.find({ machine: machineId });
            res.status(200).json(sensors);
        } catch (error) {
            errorLogger.error(`${req.method} ${req.url} ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    });

export default router;