import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name'],
    trim: true,
  },

  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true,
    unique: [true, 'Email already used'],
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    select: false,
  },

  phone: {
    type: Number,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJwtToken: async function () {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign(
      { id: this._id, name: this.name, email: this.email },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRY || '1d' }
    );

    return token;
  },

  comparePassword: async function (plainTextPassword: string) {
    const result = await bcrypt.compare(plainTextPassword, this.password);
    return result;
  },
};

const User = model('User', userSchema);
export default User;
