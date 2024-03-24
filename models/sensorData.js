/**
 * Represents a sensor used in an industrial setting.
 * Sensors are devices that measure physical properties such as temperature, pressure, etc.
 * This schema defines the structure for storing information about sensors, including their properties and associations.
 */
import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
    /**
     * The minimum value that the sensor can measure.
     * @type {Number}
     */
    value: {
        type: Number,
        require: true
    },
    /**
     * The maximum value that the sensor can measure.
     * @type {Number}
     */
    rawValue: {
        type: Number,
        require: true
    },
    /**
     * The date when the sensor was created.
     * @type {Date}
     * @default Current date and time
     */
    date: {
        type: Date,
        default: Date.now,
    },
    /**
     * The machine associated with the sensor.
     * This field references a MachineModel document representing the machine to which the sensor is attached.
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref 'SensorModel'
     * @required
     */
    sensor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor',
        require: true
    }
});
/**
 * Represents a Mongoose model for the Sensor schema.
 * @typedef {Object} SensorData
 */
const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;