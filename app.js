import express from 'express'
import dotenv from 'dotenv'
import connection from './models/connection.js'
import Routes from './routes/routes.js';
dotenv.config({path:'school.env'})
const app=express();

connection.connect((err)=>{
    if(err){
        console.error(err.stack);
        return;
    }else{
        console.log("Connected to database successfully");
    }
});
app.listen(process.env.PORT,()=>{
    console.log("Connected and listening on:",process.env.PORT);
})
app.use(Routes);