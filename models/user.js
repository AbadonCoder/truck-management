import { Schema, model } from'mongoose';
import brcypt from 'bcrypt';

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
        allowBlank: false,
        minlength: 3,
    },
    email: {
        type: String,//mongoose.SchemaTypes.Email,
        unique: true,
        required: true,
        allowBlank: false,
        minlength: 10
    }, 
    password: {
        type: String,
        minlength: 8,
        required: true,
        allowBlank: false
    },
    status: {
        type: Boolean,
        default: true
    }
});

UserSchema.pre('save', async function() {
    const user = this;
    const salt = await brcypt.genSalt(10);
    user.password = await brcypt.hash(user.password, salt);
});

const User = model('user', UserSchema);

User.prototype.validatePassword = function(password) {

    return brcypt.compareSync(password, this.password);
}

export default User;