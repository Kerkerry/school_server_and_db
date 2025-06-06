import con from '../models/connection.js';
const index=(req,res)=>{
     con.query(
        `
        SELECT a.announcement_id,a.title,a.content,u.username instructor,u.email,u.first_name,u.last_name FROM announcements a
        JOIN users u
        ON a.instructor_id=u.user_id
        `,
        (err,result)=>{
        if(err){
            res.json({statusCode:500,error:err});
            console.error(err);
        }else{
            res.json({statusCode:200,body:result});
        }
    })
}

export default {
    index
}