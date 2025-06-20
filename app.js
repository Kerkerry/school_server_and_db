import express from 'express'
import dotenv from 'dotenv'
import connection from './models/connection.js'
import Routes from './routes/routes.js';
import { graphqlHTTP } from 'express-graphql';
import schema from './models/schema.js';
dotenv.config({path:'school.env'})
const app=express();
app.use(express.json());
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

app.use(
    '/graphql',
    graphqlHTTP(
        {
            schema:schema,
            graphiql:true
        }
    )
)
// app.use(Routes);