import connection from "../models/connection.js";

const courses=(req,res)=>{
    try {
        connection.query(
            `SELECT * FROM courses`,
            (err,result)=>{
                if(err){
                    res.send({statusCode:200,body:result})
                }else{
                    res.send({statusCode:500,error:err})
                }
            }
        )
    } catch (error) {
        res.send({statusCode:500,error:error})
    }
}

const course=(req,res)=>{
    const id=req.params.id;
     try {
        connection.query(
            `SELECT * FROM courses WHERE course_id = ?`,
            [id],
            (err,result)=>{
                if(err){
                    res.send({statusCode:200,body:result})
                }else{
                    res.send({statusCode:500,error:err})
                }
            }
        )
    } catch (error) {
        res.send({statusCode:500,error:error})
    }
}

export default {
    courses,
    course
}