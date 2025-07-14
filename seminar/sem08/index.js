import express from 'express';
import mysql from 'mysql2/promise'
import { DB_USERNAME, DB_PASSWORD } from './Const.js';
import magazinRouter from './routes/MagazinRoutes.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api', magazinRouter);

let conn;

mysql.createConnection({
    host: 'localhost',
    user: DB_USERNAME,
    password: DB_PASSWORD
})
    .then((connection) => {
        conn = connection;
        return connection.query('CREATE DATABASE IF NOT EXISTS Products');
    })
    .then(() => {
        console.log("Database 'Products' created or already exists.");
        return conn.end();
    })
    .catch((err) => {
        console.error("An error occurred:");
        console.error(err.stack);
    });

let port = process.env.PORT || 8000;
app.listen(port);
console.log("API is running at " + port);