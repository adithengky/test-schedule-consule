import mongoose from 'mongoose';
import util from 'util';
import cfg from '../../../config'
// import chalk from 'chalk';

mongoose.Promise = Promise;

const mongoCfg = cfg.mongodb;

function enableDebugging(enable = true) {
  if (enable) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      // console.log(chalk.yellow(`${collectionName}.${method}`, util.inspect(query, false, 20), doc));
      console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  } else {
    mongoose.set('debug', () => { });
  }
}

export function connectLog(log = true) {
  const dsn = mongoCfg.url;
  const { options } = {
      promiseLibrary: Promise,
  };
  mongoose.logConn = mongoose.createConnection(dsn, options);
  enableDebugging(log);
  return mongoose.logConn;
}

export default {
  connectLog,
};