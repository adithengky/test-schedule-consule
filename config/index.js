const path = require('path');
require('dotenv').config();

const def = {};

const rootDir = path.dirname(__dirname);
def.logPath = path.join(rootDir, 'logs');

def.mongodb = {};
def.mongodb.url = process.env.MONGO_URL || 'mongodb+srv://aditya:Adit123@cluster0.dkqfrpr.mongodb.net/?retryWrites=true&w=majority';

def.jwt = {};
def.jwt.secret = process.env.JWT_SECRET || 'example-project-schedule';

def.price = {}
def.price = {
    15: 200000,
    30: 400000,
    60: 500000
};


module.exports = def;