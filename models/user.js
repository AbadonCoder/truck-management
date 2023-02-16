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
    token: String,
    status: {
        type: Boolean,
        required: true,
        default: false
    }
});

UserSchema.pre('save', async function() {
    const user = this;
    const salt = await brcypt.genSaltSync(10);
    user.password = await brcypt.hashSync(user.password, salt);
});

const User = model('user', UserSchema);

User.prototype.validatePassword = async function(password) {
    return await brcypt.compareSync(password, this.password);
}

export default User;