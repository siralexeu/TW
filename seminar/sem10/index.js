import express from 'express';
import env from 'dotenv';
import DB_Init from './entities/DB_Init.js';
import createDbRouter from './routes/createDBRoute.js';
import employeeRouter from './routes/EmployeeRouter.js';
import joburiRouter from './routes/JoburiRouter.js';

env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

app.use('/api', createDbRouter);
app.use("/api", employeeRouter);
app.use("/api", joburiRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);