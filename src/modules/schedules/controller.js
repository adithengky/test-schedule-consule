import mongoose from 'mongoose';
import moment from 'moment';
import  libraryModule from './../library';
import { Schedules } from './model';
import cfg from '../../../config';
import helpers from '../helpers';

export const SchedulesController = {};
export default { SchedulesController };

const jwt = libraryModule.jwt;
const priceList = cfg.price;
const helpGlobal =  helpers.globals;

SchedulesController.listSchedules = async(req, res) => {
  try {
    let { 
      start_date = '', end_date = '', order = 'consult_date', page = 1, limit = 10, sort = 'asc'
    } = req.query;

    const defaultStartDate = moment();
    const defaultEndDate = moment(defaultStartDate).add('30', 'days');


    if (start_date === '' || end_date === '') {
      start_date = defaultStartDate;
      end_date = end_date = defaultEndDate;
    }
    
    let sortOrder = sort === 'desc' ? -1 : 1;

    const sortData = {};
    sortData[order] = sortOrder;

    const match = {
        user: mongoose.Types.ObjectId(req.user.id),
        consult_date: {
          '$gte': moment(start_date).startOf('day').toDate(),
          '$lte': moment(end_date).endOf('day').toDate(),
        }
    };

    const results = await Schedules.paginate(match, {
      limit,
      page,
      sort: {consult_date: sortOrder },
      populate: 'user'
    })

    results.from = moment(start_date).format('YYYY-MM-DD');
    results.to = moment(end_date).format('YYYY-MM-DD');
      
    return res.API.success('success', results);
  } catch(err) {
    return res.API.error(err);
  }
};


SchedulesController.addSchedules = async (req, res) =>{
  try {
    const { 
      consult_date, 
      start_date_range, 
      end_date_range,
      start_time,
      duration,
      type_consult,
      type_repeat
    } = req.body;

    let startDate;
    let endDate = moment(end_date_range);

    if (moment(consult_date) < moment(start_date_range)) {
      startDate = moment(start_date_range);
    } else {
      startDate = moment(consult_date);
    }

    const arrInsert = [];
    if (type_repeat === 'monthly') {
      for (let m = startDate; m < endDate; m.add(1, 'month') ) {

        let checkEntry =  await Schedules.findOne({
          user:mongoose.Types.ObjectId(req.user.id),
          consult_date: {
            '$gte': m.startOf('day').toDate(),
            '$lte': m.endOf('day').toDate()
          },
          start_time,
        });

        if(checkEntry) {
          continue;
        } 

        const params = {
          user: req.user.id,
          consult_date: m.startOf('day').toDate(),
          duration,
          start_time,
          end_time: helpGlobal.addMinutes(start_time, duration),
          type_consult,
          price: priceList[duration]
        };

        arrInsert.push(params);
      }
    } else {
      const day = startDate.day();
      
      let current = startDate.clone();

      for (let m = current; m < endDate; current.add(7, 'day')) {
        let checkEntry =  await Schedules.findOne({
          user:mongoose.Types.ObjectId(req.user.id),
          consult_date: {
            '$gte': m.startOf('day').toDate(),
            '$lte': m.endOf('day').toDate()
          },
          start_time,
        });

        if(checkEntry) {
          continue;
        }

        const params = {
          user: req.user.id,
          consult_date: m.startOf('day').toDate(),
          duration,
          start_time,
          end_time: helpGlobal.addMinutes(start_time, duration),
          type_consult,
          price: priceList[duration]
        };
        
        arrInsert.push(params);
      }
    }

    if (arrInsert.length) {
      Schedules.insertMany(arrInsert);
    }

    return res.API.success('success', 'schedulees already created');
  } catch(err) {
    return res.API.error(err);
  }
};


