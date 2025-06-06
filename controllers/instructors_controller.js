import connection from "../models/connection.js";
const instructors=(req,res)=>{
    try{
        connection.query(
            `SELECT * FROM users WHERE role='Instructor'`,
            (err,result)=>{
                if(err){
                    res.json({statusCode:500,error:err})
                }else{
                    res.json({statusCode:200,body:result})
                }
            }
        );
    }catch(err){
        res.json({statusCode:500,error:err});
    }
}

const instructor_courses=(req,res)=>{
    const id=req.params.id;
    try {
         connection.query(
            `SELECT u.user_id,u.username,u.email,u.first_name,u.last_name,
            c.course_code,c.course_code,c.description,c.prerequisites,c.credits,c.level,c.term,
            c.required_textbooks,c.delivery_method,c.syllabus_url,c.schedule FROM users u
            JOIN courses c
            ON u.user_id=c.instructor_id
            WHERE u.user_id= ? AND role='Instructor'`,
            [id],
            (err,result)=>{
                if(err){
                    res.json({statusCode:500,error:err})
                }else{
                    res.json({statusCode:200,body:result})
                }
            }
        );
    } catch (error) {
        res.json({statusCode:500,error:error})
    }
}

export default {
    instructors,
    instructor_courses
}