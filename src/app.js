import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import helpers from './modules/helpers';
import userModule from './modules/users';
import scheduleModule from './modules/schedules';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(helpers.middleware.apiResponse());

app.use(userModule.routes);
app.use(scheduleModule.routes);
// app.use(scheduleModule.model);

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));