/**
 * Module responsible for setting up AdminJS to manage resources such as machines and sensors.
 * Utilizes AdminJS, AdminJSExpress, and AdminJSMongoose plugins to create an admin interface.
 * Registers resources (models) and builds a router for the AdminJS interface.
 * @module adminSetup
 */

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

// Import the models
import Machine from './models/machine.js';
import Sensor from './models/sensor.js';

/**
 * Registers AdminJSMongoose adapter with AdminJS to support Mongoose models.
 */
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
});

/**
 * Configuration options for the AdminJS interface.
 * Specifies the resources (models) to be managed by AdminJS.
 * @type {Object}
 */
const adminOptions = {
    resources: [Machine, Sensor],
};

/**
 * Creates an instance of AdminJS with the specified options.
 * @type {AdminJS}
 */
const admin = new AdminJS(adminOptions);

/**
 * Builds an Express router for the AdminJS interface.
 * @type {express.Router}
 */
const adminRouter = AdminJSExpress.buildRouter(admin);

export { admin, adminRouter };
