import connection from "../models/connection.js";

const courses=(req,res)=>{
    try {
        connection.query(
            `SELECT 
            cs.course_code,cs.course_name,cs.description,u.username instructor,cs.schedule,cs.prerequisites,
            cs.credits,cs.level,cs.term,cs.delivery_method,cs.syllabus_url,cs.required_textbooks,cs.start_date,cs.end_date
            FROM courses cs
            JOIN users u
            ON cs.instructor_id=u.user_id`,
            (err,result)=>{
                if(err){
                    res.send({statusCode:500,error:err})  
                }else{
                    res.send({statusCode:200,body:result})
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
            `SELECT 
            cs.course_code,cs.course_name,cs.description,u.username instructor,cs.schedule,cs.prerequisites,
            cs.credits,cs.level,cs.term,cs.delivery_method,cs.syllabus_url,cs.required_textbooks,cs.start_date,cs.end_date
            FROM courses cs
            JOIN users u
            ON cs.instructor_id=u.user_id
            WHERE course_id = ?`,
            [id],
            (err,result)=>{
                if(err){
                    res.send({statusCode:500,error:err})
                }else{
                    res.send({statusCode:200,body:result})
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