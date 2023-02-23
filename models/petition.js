import mongoose from 'mongoose';

const PetitionSchema = mongoose.Schema({
    vehicle: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        max: 9,
        required: true,
        unique: true
    },
    petition: {
        type: Date,
        required: true
    },
    output: Date,
    arrived: Date,
    status: {
        type: String,
        required: true,
        default: 'in process'
    }
});

const Petition = mongoose.model(PetitionSchema);
export default Petition;