import mongoose from 'mongoose';
import libraryModule from '../../library';

const conn = libraryModule.mongodb.connectLog();

export const UserSchema = new mongoose.Schema({
    username: { type: String, index: true },
    name: { type: String },
    password: { type: String },
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;
      delete ret.password;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
  collection: 'users',
});

class UserSchemaClass {
  static async create(data) {
    const log = new this(data);
    return log.save();
  }
}

UserSchema.loadClass(UserSchemaClass);

export const Users = conn.model('Users', UserSchema);