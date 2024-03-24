/**
 * Router for handling CRUD operations related to machines.
 * Provides endpoints for creating, reading, updating, and deleting machine entries.
 * @module MachineRouter
 */

import express from 'express';
import { body, param, validationResult } from 'express-validator';
import Machine from '../models/machine.js';
import { errorLogger } from '../logger.js';

const router = express.Router();

/**
 * Route: POST /
 * Description: Create a new machine entry.
 * Request Body:
 *   - name: String (required) - The name of the machine.
 *   - description: String - Description of the machine.
 *   - companyName: String - The name of the company associated with the machine.
 * Response:
 *   - 201 Created: The machine entry was successfully created.
 *   - 400 Bad Request: Validation errors in the request body.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.post('/',
    // Validation middleware using express-validator
    body('name').isString(),
    body('description').isString(),
    body('companyName').isString(),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const machine = new Machine(req.body);
            await machine.save();
            res.status(201).json(machine);
        } catch (error) {
            errorLogger.error(`${req.method} ${req.url} ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    });

/**
 * Route: GET /
 * Description: Retrieve all machine entries.
 * Response:
 *   - 200 OK: Successful retrieval of machine entries.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.get('/', async (req, res) => {
    try {
        const machines = await Machine.find();
        res.status(201).json(machines);
    } catch (error) {
        errorLogger.error(`${req.method} ${req.url} ${error.message}`);
        res.status(500).json({ message: error.message });
    }

});

/**
 * Route: GET /:id
 * Description: Retrieve a machine entry by its ID.
 * Path Parameters:
 *   - id: String (required) - The ID of the machine entry.
 * Response:
 *   - 200 OK: Successful retrieval of the machine entry.
 *   - 404 Not Found: Machine entry not found.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.get('/:id', async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);
        if (!machine) {
            errorLogger.error(`${req.method} ${req.url} Machine entry not found`);
            return res.status(404).json({ message: 'Machine entry not found' });
        }
        res.json(machine);
    } catch (error) {
        errorLogger.error(`${req.method} ${req.url} ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

/**
 * Route: PATCH /:id
 * Description: Update a machine entry by its ID.
 * Path Parameters:
 *   - id: String (required) - The ID of the machine entry.
 * Request Body: Fields to update.
 * Response:
 *   - 200 OK: Successful update of the machine entry.
 *   - 404 Not Found: Machine entry not found.
 *   - 400 Bad Request: Validation errors or invalid request body.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.patch('/:id', param('id').isMongoId(),
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('companyName').optional().isString(), async (req, res) => {
        try {
            const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!machine) {
                errorLogger.error(`${req.method} ${req.url} Machine entry not found`);
                return res.status(404).json({ message: 'Machine entry not found' });
            }
            res.json(machine);
        } catch (error) {
            errorLogger.error(`${req.method} ${req.url} ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    });

/**
 * Route: DELETE /:id
 * Description: Delete a machine entry by its ID.
 * Path Parameters:
 *   - id: String (required) - The ID of the machine entry to delete.
 * Response:
 *   - 200 OK: Machine entry deleted successfully.
 *   - 404 Not Found: Machine entry not found.
 *   - 500 Internal Server Error: Unexpected server error.
 */
router.delete('/:id', async (req, res) => {
    try {
        const machine = await Machine.findByIdAndDelete(req.params.id);
        if (!machine) {
            errorLogger.error(`${req.method} ${req.url} Machine entry not found`);
            return res.status(404).json({ message: 'Machine entry not found' });
        }
        res.json({ message: 'Machine entry deleted successfully' });
    } catch (error) {
        errorLogger.error(`${req.method} ${req.url} ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});

export default router;