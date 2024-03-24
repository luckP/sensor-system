/**
 * Router for handling CRUD operations related to sensor data.
 * Provides endpoints for creating, reading, updating, and deleting sensor data entries.
 * @module SensorDataRouter
 */
import express from 'express';
import { body, param, validationResult } from 'express-validator';
import SensorData from '../models/sensorData.js';
import { errorLogger } from '../logger.js';

const router = express.Router();

/**
 * Route: POST /
 * Description: Create a new sensor data entry.
 * Request Body:
 *   - value: Number (required) - The value of the sensor data.
 *   - rawValue: Number (required) - The raw value of the sensor data.
 *   - sensor: String (required) - The ID of the associated sensor.
 * Response:
 *   - 201 Created: The sensor data entry was successfully created.
 *   - 400 Bad Request: Validation errors in the request body.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.post('/',
  // Validation middleware using express-validator
  body('value').isNumeric(),
  body('rawValue').isNumeric(),
  body('sensor').isMongoId(),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const sensorData = new SensorData(req.body);
      await sensorData.save();
      res.status(201).json(sensorData);
    } catch (error) {
      errorLogger.error(`${req.method} ${req.url} ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  });

/**
 * Route: GET /
 * Description: Retrieve all sensor data entries.
 * Response:
 *   - 200 OK: Successful retrieval of sensor data entries.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.get('/', async (req, res) => {
  try {
    const sensorData = await SensorData.find();
    res.json(sensorData);
  } catch (error) {
    errorLogger.error(`${req.method} ${req.url} ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Route: GET /:id
 * Description: Retrieve a sensor data entry by its ID.
 * Path Parameters:
 *   - id: String (required) - The ID of the sensor data entry.
 * Response:
 *   - 200 OK: Successful retrieval of the sensor data entry.
 *   - 404 Not Found: Sensor data entry not found.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.get('/:id', async (req, res) => {
  try {
    const sensorData = await SensorData.findById(req.params.id);
    if (!sensorData) {
      return res.status(404).json({ message: 'Sensor data entry not found' });
    }
    res.json(sensorData);
  } catch (error) {
    errorLogger.error(`${req.method} ${req.url} ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

/**
 * Route: PATCH /:id
 * Description: Update a sensor data entry by its ID.
 * Path Parameters:
 *   - id: String (required) - The ID of the sensor data entry.
 * Request Body: Fields to update.
 * Response:
 *   - 200 OK: Successful update of the sensor data entry.
 *   - 404 Not Found: Sensor data entry not found.
 *   - 400 Bad Request: Validation errors or invalid request body.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.patch('/:id', param('id').isMongoId(),
  body('value').optional().isNumeric(),
  body('rawValue').optional().isNumeric(),
  body('sensor').optional().isMongoId(), async (req, res) => {
    try {
      const sensorData = await SensorData.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!sensorData) {
        return res.status(404).json({ message: 'Sensor data entry not found' });
      }
      res.json(sensorData);
    } catch (error) {
      errorLogger.error(`${req.method} ${req.url} ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  });

/**
 * Route: DELETE /:id
 * Description: Delete a sensor data entry by its ID.
 * Path Parameters:
 *   - id: String (required) - The ID of the sensor data entry to delete.
 * Response:
 *   - 200 OK: Sensor data entry deleted successfully.
 *   - 404 Not Found: Sensor data entry not found.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.delete('/:id', async (req, res) => {
  try {
    const sensorData = await SensorData.findByIdAndDelete(req.params.id);
    if (!sensorData) {
      return res.status(404).json({ message: 'Sensor data entry not found' });
    }
    res.json({ message: 'Sensor data entry deleted successfully' });
  } catch (error) {
    errorLogger.error(`${req.method} ${req.url} ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
