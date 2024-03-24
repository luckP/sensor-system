/**
 * Represents a sensor used in an industrial setting.
 * Sensors are devices that measure physical properties such as temperature, pressure, etc.
 * This schema defines the structure for storing information about sensors, including their properties and associations.
 */
import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
    /**
     * The name of the sensor.
     * @type {String}
     * @required
     */
    name: {
        type: String,
        require: true
    },
    /**
     * The date when the sensor was created.
     * @type {Date}
     * @default Current date and time
     */
    createDate: {
        type: Date,
        default: Date.now,
    },
    /**
     * The unit of measurement used by the sensor.
     * @type {String}
     * @required
     */
    unitOfMeasurement: {
        type: String,
        require: true
    },
    /**
     * The minimum value that the sensor can measure.
     * @type {Number}
     */
    minValue: {
        type: Number,
        require: false
    },
    /**
     * The maximum value that the sensor can measure.
     * @type {Number}
     */
    maxValue: {
        type: Number,
        require: false
    },
    /**
     * The machine associated with the sensor.
     * This field references a MachineModel document representing the machine to which the sensor is attached.
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref 'MachineModel'
     * @required
     */
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
        require: true
    }
});

/**
 * Represents a Mongoose model for the Sensor schema.
 * @typedef {Object} Sensor
 */
const Sensor = mongoose.model('Sensor', sensorSchema);

export default Sensor;
