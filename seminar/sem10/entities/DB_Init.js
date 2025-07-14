import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import Employee from "./Employee.js";
import Adresa from "./Adresa.js";
import Joburi from "./Joburi.js";
import { aliasAdresa, jobAlias, employeeAlias } from './dbConst.js';

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}

function FK_Config(){

    // ----------------------- 1-n -------------------------------------
    Employee.hasMany(Adresa, {as: aliasAdresa,  foreignKey: "EmployeeId"});
    Adresa.belongsTo(Employee, {foreignKey: "EmployeeId"})

    // ----------------------- n-n -------------------------------------
    Employee.belongsToMany(Joburi, {through: "JobEmployee", as: jobAlias, foreignKey: "EmployeeId"})
    Joburi.belongsToMany(Employee, {through: "JobEmployee", as: employeeAlias, foreignKey: "JobId"})

}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;