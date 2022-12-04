import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import moment from 'moment';
import libraryModule from '../../library';
import { Users } from '../../users/model';

const Schema = mongoose.Schema;

const conn = libraryModule.mongodb.connectLog();

// this is testing purpose only, need to change it later
export const ScheduleSchema = new mongoose.Schema({
    user: { 
      type: Schema.Types.ObjectId,
      ref: Users
    },
    consult_date: { type: Date },
    start_time: { 
      type: String,
    },
    end_time: { 
      type: String,
    },
    duration: {
      type: Number,
      enum : [15, 30, 60],
      default: 15
    },
    type_consult: {
      type: String,
      enum : ['chat', 'videocall', 'call'],
      default: 'chat'
    },
    price: { type: Number }
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
        delete ret.createdAt;
        delete ret.updatedAt;
        ret.consult_date = moment(ret.consult_date).format('YYYY-MM-DD');
        return ret;
    },
  },
  collection: 'schedules',
});

class ScheduleSchemaClass {
  static async create(data) {
    const log = new this(data);
    return log.save();
  }
}

ScheduleSchema.loadClass(ScheduleSchemaClass);
ScheduleSchema.plugin(mongoosePaginate);

export const Schedules = conn.model('Schedules', ScheduleSchema);