/**
 * Represents sensor data captured at a specific point in time.
 * Sensor data typically includes measured values, raw values, and the timestamp of the measurement.
 * This schema defines the structure for storing sensor data records in the database.
 */
import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
    /**
     * The measured value captured by the sensor.
     * @type {Number}
     * @required
     */
    value: {
        type: Number,
        required: true
    },
    /**
     * The raw value captured by the sensor.
     * @type {Number}
     * @required
     */
    rawValue: {
        type: Number,
        required: true
    },
    /**
     * The timestamp indicating when the sensor data was captured.
     * @type {Date}
     * @default Current date and time
     * @required
     */
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    /**
     * The ID of the sensor associated with the sensor data.
     * This field references a Sensor document representing the sensor that captured the data.
     * @type {mongoose.Schema.Types.ObjectId}
     * @ref 'Sensor'
     * @required
     */
    sensorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor',
        required: true
    }
});

/**
 * Represents a Mongoose model for the SensorData schema.
 * @typedef {Object} SensorData
 */
const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;
