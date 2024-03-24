/**
 * Represents a machine within an industrial production line.
 * This schema defines the structure for storing information about machines, including their parameters and metadata.
 */

import mongoose from 'mongoose';


const machineSchema = new mongoose.Schema({
    /**
     * The name of the machine.
     * @type {String}
     * @required
     */
    name: {
        type: String,
        require: true
    },
    /**
     * The date when the machine was created.
     * @type {Date}
     * @default Current date and time
     */
    createDate: {
        type: Date,
        default: Date.now
    },
    /**
     * The date when the machine was last updated.
     * @type {Date}
     * @default Current date and time
     */
    updateDate: {
        type: Date,
        default: Date.now
    },
    /**
     * Description of the machine.
     * @type {String}
     */
    description: {
        type: String
    },
    /**
     * The name of the company associated with the machine.
     * @type {String}
     */
    companyName: {
        type: String
    }
});

/**
 * Middleware to update the updateDate field before saving the document.
 * This ensures that the updateDate is always up-to-date when the document is saved.
 */
machineSchema.pre('save', function (next) {
    this.updateDate = new Date();
    next();
});


/**
 * Represents a Mongoose model for the Machine schema.
 * @typedef {Object} MachineModel
 */
const Machine = mongoose.model('Machine', machineSchema);

export default Machine;


