import Sequelize from 'sequelize';
import env from 'dotenv';

env.config();

const db = new Sequelize({
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,  
    // host: "myserver" -- aici se pune numele serverul de sql
    logging: false,
    define: {
    timestamps: false,
    freezeTableName: true
    }  
})

export default db;