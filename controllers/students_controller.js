import con from '../models/connection.js';


const students=(req,res)=>{
    try {
        con.query(
            `SELECT * FROM users WHERE role='Student'`,
            (err,result)=>{
                if(err){
                    res.json({statusCode:500,error:err});
                }else{
                    res.json({students:result});
                }
            }
        )
    } catch (error) {
        res.json({statusCode:500,error:error});
    }
}

const student=(req,res)=>{
    const id=req.params.id
       try {
        con.query(
            `SELECT 
            u.user_id,u.username,u.first_name,u.last_name,u.email,
            c.course_code,c.course_name,c.description, c.prerequisites,
            c.credits,c.level,c.term
             FROM users u
            JOIN enrollments e
            ON u.user_id=e.student_id
            JOIN courses c
            ON e.course_id=c.course_id
            WHERE u.user_id = ? AND role='Student'`,
            [id],
            (err,result)=>{
                if(err){
                    res.json({statusCode:500,error:err});
                }else{
                    res.json({statusCode:200,body:result});
                }
            }
        )
    } catch (error) {
        res.json({statusCode:500,error:error});
    }
}

const create_student=(req,res)=>{
    let {username,email,role,password_hash,first_name,last_name}=req.body;
    try {
        con.query(
            `INSERT INTO users(username,email,role,password_hash,first_name,last_name)  
            VALUES(?,?,?,?,?,?)`,
            [username,email,role,password_hash,first_name,last_name],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.status(400).json({error:err});
                }else{
                    console.log(result);
                    res.status(200).json({success:result});
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error})
    }
}

const updateStudent=(req,res)=>{
    console.log(req.body);
     let {user_id,username,email,role,password_hash,first_name,last_name}=req.body;
    try {
        con.query(
            `UPDATE users SET username = ?,email = ?, role = ?,password_hash = ?,first_name = ?,last_name = ? WHERE user_id = ?`,
            [username,email,role,password_hash,first_name,last_name,user_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.status(400).json({error:err});
                }else{
                    console.log(result);
                    res.status(200).json({success:result});
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error})
    }
}

const course_materials=(req,res)=>{
    try {
        con.query(
            `SELECT 
            c.material_id, cs.course_name,cs.course_code, m.module_name,m.module_order, 
            c.title material_title,c.description material_description,c.file_path,
            c.file_type,u.username uploaded_by,u.role
            FROM course_materials c
            JOIN courses cs
            ON c.course_id=cs.course_id
            JOIN users u 
            ON u.user_id=c.uploaded_by
            JOIN course_modules m
            ON m.module_id=c.module_id
            `,
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
const course_material=(req,res)=>{
    const id=req.params.id
    try {
        con.query(
            `SELECT 
            c.material_id,cs.course_name,cs.course_code, m.module_name,m.module_order, 
            c.title material_title,c.description material_description,c.file_path,
            c.file_type,u.username uploaded_by,u.role
            FROM course_materials c 
            JOIN courses cs
            ON c.course_id=cs.course_id
            JOIN users u 
            ON u.user_id=c.uploaded_by
            JOIN course_modules m
            ON m.module_id=c.module_id
            WHERE c.material_id = ?`,
            [id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.json({statusCode:500,error:err})
                }else{
                    res.json({statusCode:200,body:result})
                }
            }
        );
    } catch (error) {
        res.send({statusCode:500,error:error})
    }
}

export default{
    student,
    students,
    create_student,
    updateStudent,
    course_materials,
    course_material
}