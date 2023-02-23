import {Schema, model} from 'mongoose';

const TruckSchema = new Schema({
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    plate: {
        type: String,
        max: 9,
        required: true,
        unique: true
    }
});

const Truck = model('truck', TruckSchema);
export default Truck;