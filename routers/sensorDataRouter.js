import express from 'express';
import { body, validationResult } from 'express-validator';
import SensorData from '../models/sensorData.js';

const router = express.Router();

// Route for creating a new sensor data entry
router.post('/', 
  // Validation middleware using express-validator
  body('value').isNumeric(),
  body('rawValue').isNumeric(),
  body('sensorId').isMongoId(),
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
      res.status(400).json({ message: error.message });
    }
});

// Route for retrieving all sensor data entries
router.get('/', async (req, res) => {
  try {
    const sensorData = await SensorData.find();
    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for retrieving a specific sensor data entry by ID
router.get('/:id', async (req, res) => {
  try {
    const sensorData = await SensorData.findById(req.params.id);
    if (!sensorData) {
      return res.status(404).json({ message: 'Sensor data entry not found' });
    }
    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating a sensor data entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const sensorData = await SensorData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sensorData) {
      return res.status(404).json({ message: 'Sensor data entry not found' });
    }
    res.json(sensorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route for deleting a sensor data entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const sensorData = await SensorData.findByIdAndDelete(req.params.id);
    if (!sensorData) {
      return res.status(404).json({ message: 'Sensor data entry not found' });
    }
    res.json({ message: 'Sensor data entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
