import mysql from 'mysql2';
import dotenv from'dotenv';
dotenv.config({path:'school.env'})
const connection=mysql.createConnection(
    {
        host:process.env.HOST,
        user: process.env.DB_USER,
        password:process.env.PASSWORD,
        database:process.env.DB,
        port:process.env.DB_PORT
    }
);

export default connection;