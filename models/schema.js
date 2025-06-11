import { GraphQLEnumType, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType,GraphQLInputObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from "graphql";
import connection from './connection.js'
import bcrypt from 'bcrypt'
import mockDatabase from "./mockdb.js";
// Queries to fetch data from the database
const users=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM users`,
            (err,result)=>{
                if(err){
                    console.error("Database query error:", err);
                    reject(err);
                }else{               
                    resolve(result);
                }
            }
        )
    })
}

const courses=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM courses`,
            (err,result)=>{
                if(err){
                    console.error("Database query error:", err);
                    reject(err); 
                }else{
                    resolve(result)
                }
            }
        )
    })
}

const enrollments=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Enrollments`,
            (err,result)=>{
                if(err){
                    console.error("Database query error:", err);
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}

const courseModules = ()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Course_Modules`,
            (err,result)=>{
                if(err){
                    console.error("Database query error:", err);
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}

const courseMaterials=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Course_Materials`,
            (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
            }
        )
    })
} 

const assignments=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Assignments`,
            (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
            }
        )
    })
}

const submissions=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Submissions`,
            (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
            }
        )
    })
}

const grades=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Grades`,
            (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
            }
        )
    })
}

const announcements=()=>{
    return new Promise(
        (resolve,reject)=>{
            connection.query(
            `SELECT * FROM Announcements`,
                (err,result)=>{
                        if(err){
                            console.error("Database query error:", err);
                            reject(err)
                        }else{
                            resolve(result)
                        }
                }
            )
        }
    )
} 

const discussionForums=()=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Discussion_Forums`,
            (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
            }
        )
    })
} 

const discussionPosts =()=>{
    return new Promise(
        (resolve,reject)=>{
            connection.query(
                `SELECT * FROM Discussion_Posts`,
                (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
                }
            )
        }
    )
}

const messages=()=>{
    return new Promise(
        (resolve,reject)=>{
            connection.query(
            `SELECT * FROM Messages`,
            (err,result)=>{
                    if(err){
                        console.error("Database query error:", err);
                        reject(err)
                    }else{
                        resolve(result)
                    }
            }
        )
        }
    )
}


// Queries to create add data into the database
// 1. Create assignment
const createAssignment=(inputData)=>{    
    return new Promise((resolve,reject)=>{
        connection.query(
            `INSERT INTO assignments
            (course_id,instructor_id,title,description,due_date,instructions,grading_criteria,assignment_type,max_points,grading_scale)
            VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                inputData.course_id,inputData.instructor_id,inputData.title,inputData.description,inputData.due_date,inputData.instructions,
                inputData.grading_criteria,inputData.assignment_type,inputData.max_points,inputData.grading_scale
            ],
            (err,result)=>{
                if(err){
                    console.error("Error creating assignment: ",err);
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}

//2. Create user
const createUser=(userInput)=>{

    const saltRounds=12;
    return new Promise((resolve,reject)=>{
        // Encrypting password
        bcrypt.hash(userInput.password_hash, saltRounds, function(err, hash) {
                if(err){
                    reject(err)
                }else{
                    // Database DDL
                        connection.query(
                            `INSERT INTO users(username,password_hash,email,role,first_name,last_name)
                            VALUES(?,?,?,?,?,?)`,
                            [userInput.username,hash,userInput.email,userInput.role,userInput.first_name,userInput.last_name],
                            (err,result)=>{
                                if(err){
                                    console.error(err);
                                    reject(err)
                                }else{
                                    resolve(result)
                                }
                            }
                        )
                    
                }
        })
    })
}

//3. Create course
const createCourse=(courseInput)=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `INSERT INTO courses(course_name,course_code,description,instructor_id,
            schedule,prerequisites,start_date,end_date,credits,level,
            term,delivery_method,syllabus_url,required_textbooks)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [courseInput.course_name,courseInput.course_code,courseInput.description,courseInput.instructor_id,
            courseInput.schedule,courseInput.prerequisites,courseInput.start_date,courseInput.end_date,courseInput.credits,courseInput.level,
            courseInput.term,courseInput.delivery_method,courseInput.syllabus_url,courseInput.required_textbooks],
           (err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
           } 
        )
    })
}

// 4. Create enrollment
const createEnrollment=(enrollmentInput)=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `INSERT INTO enrollments(student_id,course_id,status)
            VALUES(?,?,?)`,
            [enrollmentInput.student_id,enrollmentInput.course_id,enrollmentInput.status],
            (err,result)=>{
                if(err){
                    console.error(`Error creating the course: ${err}`);
                    reject(err)
                }else{
                    resolve(result);
                }
            }
        )
    })
}


// 5. Create couse modules
const createCourseModule=(cmodule)=>{
    return new Promise((resolve,reject)=>{
        connection.query(
            `INSERT INTO Course_Modules(course_id,module_name,module_order)
            VALUES(?,?,?)`,
            [cmodule.course_id,cmodule.module_name,cmodule.module_order],
            (err,result)=>{
                if(err){
                    console.error(`Error creating course_module: ${err}`);
                    reject(err)
                }else{
                    resolve(result)
                }
            }
        )
    })
}
// --- GraphQL Enum Types for Fixed Values ---
const UserRoleType=new GraphQLEnumType(
    {
        name:'UserRole',
        description:"Possible roles of the user role in the system",
        values:{
            STUDENT:{value:'Student'},
            INSTRUCTOR:{value:"Instructor"},
            ADMIN:{value:"Admin"}
        }
    }
);

const EnrollmentStatusType=new GraphQLEnumType(
    {
        name:"EnrolmentStatus",
        description:"Status of student enrolment",
        values:{
            ENROLLED:{value:"Enrolled"},
            WAITLISTED:{value:"Waitlisted"},
            DROPPED:{value:"Dropped"}
        }
    }
);

const AssignmentTypes=new GraphQLEnumType(
    {
        name:"AssignmentTypes",
        description:"Represents Assignment type",
        values:{
            ESSAY:{value:'Essay'},
            QUIZ:{value:'Quiz'},
            PROJECT:{value:'Project'},
            OTHER:{value:'Other'}
        }
    }
)

const SubmissionTypes=new GraphQLEnumType(
    {
        name:"SubmissionTypes",
        description:"Represents submissions types in the system",
        values:{
            // ('Submitted', 'Late', 'Graded', 'Draft') 
            SUBMITTED:{value:'Submitted'},
            LATE:{value:'Late'},
            GRADED:{value:'Graded'},
            DRAFT:{type:'Draft'}
        }
    }
)

// --- GraphQL Object Types ---
// 1. UserType
const UserType=new GraphQLObjectType(
    {
        name:"User",
        description:"Represent the user in the system",
        fields:()=>(
            {
                userId:{type:GraphQLID,resolve:(user)=>user.user_id},
                username:{type:GraphQLString},
                email:{type:GraphQLString},
                firstName:{type:GraphQLString,resolve:(user)=>user.first_name},
                lastName:{type:GraphQLString,resolve:(user)=>user.last_name},
                role:{type:UserRoleType},
                password:{type:GraphQLString, resolve:(user)=>user.password_hash},
                lastLogin:{type:GraphQLString,resolve:(user)=>user.last_login},
                createAt:{type:GraphQLString,resolve:(user)=>user.created_at},
                courseTought:{
                    type:new GraphQLList(CourseType),
                    resolve:(parent)=>{
                        if(parent.role=="Instructor"){
                            return courses()
                                .then(coursesList=>coursesList.filter(course=>course.instructor_id === parent.user_id)
                                    ).catch(error=>{
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                    })
                        }
                        return []
                    }
                },
                enrollments:{
                    type:new GraphQLList(EnrollmentType),
                    resolve:(parent)=>{
                        if(parent.role=='Student'){
                            // return mockDatabase.enrollments.filter(enrollment=>enrollment.student_id === parent.user_id)
                            return enrollments()
                                .then(enrollmentList=>enrollmentList.filter(enrollment=>enrollment.student_id === parent.user_id))
                                    .catch(error=>{
                                        console.error("\nFailed to fetch users (via .catch):", error.message);
                                        return error
                                    })
                        }
                        return []
                    }
                }

            }
        )
    }
)

// 2. CourseType
const CourseType=new GraphQLObjectType(
    {
        name:"CourseType",
        description:"Represents a university course",
        fields:()=>(
            {
                courseId:{type:GraphQLID,resolve:(course)=>course.course_id },
                courseCode:{type:GraphQLString,resolve:(course)=>course.course_code},
                courseName:{type:GraphQLString,resolve:(course)=>course.course_name},
                description:{type:GraphQLString},
                credit:{type:GraphQLFloat},
                // Relationship to Instructor (Many-to-One)
                instructor: {
                    type:UserType,
                    resolve: async (parent)=>{
                     try {
                            const usersList = await users();
                            return usersList.find(user => user.user_id == parent.instructor_id);
                        } catch (error) {
                            console.error("\nFailed to fetch users (via .catch):", error.message);
                            return error;
                        }
                    }
                },
                // Relationship to Enrollments (One-to-Many)
                enrollments:{
                    type:new GraphQLList(EnrollmentType),
                    resolve:(parent)=>{
                        // return mockDatabase.enrollments.filter(enrollment=>enrollment.course_id === parent.course_id)
                        return enrollments()
                            .then(enrollmentsList=>enrollmentsList.filter(enrollment=>enrollment.course_id === parent.course_id))
                                .catch(error=>{
                                    console.error("\nFailed to fetch users (via .catch):", error.message);
                                    return error;
                                })
                    }
                },
                // Relationship to Assignments (One-to-Many)
                assignments:{
                    type:new GraphQLList(AssignmentType),
                    resolve: (parent)=>{
                        // return mockDatabase.assignments.filter(assignment=>assignment.course_id=parent.course_id)
                        return assignments()
                            .then(assignmentsList=>assignmentsList.filter(assignment=>assignment.course_id=parent.course_id))
                                .catch(error=>{
                                    console.error("\nFailed to fetch users (via .catch):", error.message);
                                    return error;
                                })
                    }
                }
            }
        )
    }
)

// EnrollmentType
const EnrollmentType=new GraphQLObjectType(
    {
        name:"EnrollmentType",
        description:"Represents students enrollment in the courses",
        fields:()=>(
            {
                enrollmentId:{type:GraphQLString,resolve:(enrollment)=>enrollment.enrollment_id},
                status:{type:EnrollmentStatusType},
                enrollentDate:{type:GraphQLString,resolve:(enrollment)=>enrollment.enrollent_date},
                // Relationship to Student (Many-to-One)
                student:{
                    type:UserType,
                    resolve:async (parent)=>{
                        // return users.find(user=>user.user_id===parent.student_id);
                    try {
                            const usersList = await users();
                            return usersList.find(user => user.user_id == parent.student_id);
                        } catch (error) {
                            console.error("\nFailed to fetch users (via .catch):", error.message);
                            return error;
                        }
                        
                    }
                },
                // Relationship to Course (Many-to-One)
                course:{
                    type:CourseType,
                    resolve:(parent)=>{
                        return courses()
                                .then(coursesList=>coursesList.find(course=>course.course_id ===parent.course_id))
                                    .catch(error=>{
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                    })
                    }
                }

            }
        )
    }
)

// 4. AssignmentType
const AssignmentType=new GraphQLObjectType(
    {
        name:"AssignmentType",
        description:"Represents students assignments in the system",
        fields:()=>(
            {
                assignmentId:{type:GraphQLString,resolve:(assignment=>assignment.assignment_id)},
                title:{type:GraphQLString},
                description:{type:GraphQLString},
                instructions: {type:GraphQLString},
                gradingCriteria:{type:GraphQLString,resolve:(assignment)=>assignment.grading_criteria}, 
                assignmentType:{type:AssignmentTypes,resolve:(assignment)=>assignment.assignment_type}, 
                maxPoints:{type:GraphQLFloat,resolve:(assignment)=>assignment.max_points }, 
                gradingScale:{type:GraphQLString,resolve:(assignment)=>assignment.grading_scale }, 
                dueDate:{type:GraphQLString,resolve:(assignment)=>assignment.due_date},
                //Many-to-One with Courses (many assignments belong to one course).
                course:{
                    type:CourseType,
                    resolve:async (parent)=>{
                        try {
                            const coursesList = await courses();
                            return coursesList.find(course => course.course_id === parent.course_id);
                        } catch (error) {
                            console.error("\nFailed to fetch users (via .catch):", error.message);
                            return error;
                        }
                    }
                },
                // Many-to-One with Users (many assignments are created by one instructor).
                instructor:{
                    type:UserType,
                    resolve:async (parent)=>{
                        // return users.find(user=>user.user_id===parent.instructor_id)
                        try {
                            const usersList = await users();
                            return usersList.find(user => user.user_id == parent.instructor_id);
                        } catch (error) {
                            console.error("\nFailed to fetch users (via .catch):", error.message);
                            return error;
                        }
                        
                    }
                },
                // One-to-Many with Submissions (an assignment has many submissions).
                submissions:{
                    type:new GraphQLList(SubmissionType),
                    resolve:(parent,{studentId})=>{
                        // let submissions=mockDatabase. submissions.filter(submission=>submission.assignment_id===parent.assignment_id)
                        let submissions=submissions().then(submissionsList=>submissionsList.filter(submission=>submission.assignment_id===parent.assignment_id)).catch(error=>error)
                        if(studentId){
                            return submissions= submissions.filter(sub=>sub.student_id===parseInt(studentId));
                        }
                        return submissions;
                    }
                }
            }
        )
    }
)

// 5. SubmissionType

const SubmissionType=new GraphQLObjectType(
    {
        name:"SubmissionType",
        description:"Represents aubmissions in the system",
        fields:()=>(
            {
                submissionId:{type:GraphQLID,resolve:(submission)=>submission.submission_id },
                filePath:{type:GraphQLString,resolve:(submission)=>submission.file_path  },
                filePath:{type:GraphQLString,resolve:(submission)=>submission.file_path  },
                textContent:{type:GraphQLString,resolve:(submission)=>submission.text_content  },
                status:{type:SubmissionTypes},
                submissionDate:{type:GraphQLString,resolve:(sub)=>sub.submission_date },

                // Many-to-One with Assignments (many submissions belong to one assignment).
                assignment:{
                    type:AssignmentType,
                    resolve:(parent)=>{
                        // return mockDatabase. assignments.find(assignment=>assignment.assignment_id==parent.assignment_id)
                        return assignments()
                                .then(assignmentsList=>assignmentsList.find(assignment=>assignment.assignment_id==parent.assignment_id))
                                    .catch(error=>{
                                        console.error("\nFailed to fetch users (via .catch):", error.message);
                                        return error;
                                    })
                    }
                },
                // Many-to-One with Users (many submissions are made by one student).
                student:{
                    type:UserType,
                    resolve:async (parent)=>{
                        // return users.find(user=>user.user_id===parent.student_id)
                        try {
                            const usersList = await users();
                            return usersList.find(user => user.user_id == parent.student_id);
                        } catch (error) {
                            console.error("\nFailed to fetch users (via .catch):", error.message);
                            return error;
                        }
                        
                    }
                },
                // One-to-One with Grades (each submission can have one grade).
                grade:{
                    type:GradeType,
                    resolve:(parent)=>{
                        // return mockDatabase. grades.find(grade=>grade.grade_id===parent.grade_id)
                        return grades()
                                .then(gradesList=>gradesList.find(grade=>grade.grade_id===parent.grade_id))
                                    .catch(error=>{
                                        console.error("\nFailed to fetch users (via .catch):", error.message);
                                        return error;
                                    })
                    }
                }
            }
        )
    }
)

// 6. GradeType
const GradeType=new GraphQLObjectType(
    {
        name:"GradeType",
        description:"Represents studets grades in the systems",
        fields:()=>(
            {
                gradeId:{type:GraphQLString,resolve:(grade)=>grade.grade_id},
                scor:{type:GraphQLFloat},
                feedbackText :{type:GraphQLString,resolve:(grade)=>grade.feedback_text },
                feedbackAudio :{type:GraphQLString,resolve:(grade)=>grade.feedback_audio },
                gradeDate  :{type:GraphQLString,resolve:(grade)=>grade.grade_date  },
                // One-to-One with Submissions (a grade is for one specific submission).
                submission:{
                    type:SubmissionType,
                    resolve:(parent)=>{
                        // return mockDatabase. submissions.find(sub=>sub.submission_id===parent.submission_id)
                        return submissions()
                            .then(submissionsList=>submissionsList.find(sub=>sub.submission_id===parent.submission_id))
                                .catch(error=>{
                                        console.error("\nFailed to fetch users (via .catch):", error.message);
                                        return error;
                                })
                    }
                },
                // Many-to-One with Users (many grades are given by one instructor).
                gradedBy:{
                    type:UserType,
                    resolve:async (parent)=>{
                        // return users.find(user=>user.user_id===parent.user_id)
                         try {
                            const usersList = await users();
                            return usersList.find(user => user.user_id == parent.user_id);
                        } catch (error) {
                            console.error("\nFailed to fetch users (via .catch):", error.message);
                            return error;
                        }
                    }
                }
            }
        )
    }
)

// 7. CourseMaterialDetailType - NEW OBJECT TYPE FOR THE QUERY
const CourseMaterialDetailType=new GraphQLObjectType(
    {
        name:'CourseMaterialDetailType',
        description:"Represents course materials",
        fields:()=>(
            {
                materialId:{type:GraphQLString,resolve:(coursem)=>coursem.material_id },
                title:{type:GraphQLString },
                description:{type:GraphQLString},
                filePath:{type:GraphQLString,resolve:(coursem)=>coursem.file_path  },
                fileType:{type:GraphQLString,resolve:(coursem)=>coursem.file_type   },
                externalUrl:{type:GraphQLString,resolve:(coursem)=>coursem.external_url},
                uploadDate :{type:GraphQLString,resolve:(coursem)=>coursem.upload_date },

                moduleName:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        // let module=mockDatabase.course_modules.find(m=>m.module_id===material.module_id)
                        let module=courseModules().then(modules=>modules.find(m=>m.module_id===material.module_id)).catch(error=>error)
                        return module ? module.module_name:null
                    }
                },

                moduleOrder:{
                    type:GraphQLInt,
                    resolve:(material)=>{
                        // let module=mockDatabase.course_modules.find(m=>m.module_id===material.module_id)
                        let module=courseModules().then(modules=>modules.find(m=>m.module_id===material.module_id)).catch(error=>error)
                        return module ? module.module_order : null
                    }
                },

                courseCode:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        let course=courses()
                                .then(coursesList=>coursesList.find(course=>course.course_id ===parent.course_id)
                            ).catch(error=>{
                                    console.error("\nFailed to fetch users (via .catch):", error.message);
                                    return error
                            })
                        return course ? course.course_code:null
                    }
                },

                courseName:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        let course=courses()
                                .then(coursesList=>coursesList.find(course=>course.course_id ===parent.course_id))
                                    .catch(error=>{
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                        })
                        return course ? course.course_name:null
                    }
                },

                uploadedBy:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        // let user=users.find(user=>user.user_id===parent.uploaded_by)
                        let user=users()
                            .then(usersList=>usersList.find(user=>user.user_id===parent.uploaded_by)
                                ).catch(error => {
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                        });
                        return user ? user.username :null
                    }
                },

                uploadedByRole:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        // let user=users.find(user=>user.user_id===parent.uploaded_by)
                        let user=users()
                            .then(usersList=>usersList.find(user=>user.user_id===parent.uploaded_by)
                                ).catch(error => {
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                        });
                        return user ? user.role :null
                    }
                }
            }
        )
    }
)

// 8. CourseModuleType
const CourseModuleType=new GraphQLObjectType(
    {
        name:"CourseModuleType",
        description:"Represents course modules",
        fields:()=>(
            {   moduleId:{type:GraphQLID,resolve:(cm)=>cm.module_id},
                moduleName:{type:GraphQLString,resolve:(cm)=>cm.module_name},
                moduleOrder:{type:GraphQLInt,resolve:(cm)=>cm.module_order},
                course:{
                    type:CourseType,
                    resolve:(parent)=>{
                        return courses()
                            .then(coursesList=>coursesList.find(course=>course.course_id===parent.course_id))
                                .catch(error=>console.error(`Error finding a course for course module: ${error}`))
                    }
                }
            }
        )
    }
)
// --- Input Types for Mutations ---

//a) Input type for creating a new user
const UserInput=new GraphQLInputObjectType(
    {
        name:"UserInput",
        description:"Input fields for creating new user",
        fields:{
            username:{type:new GraphQLNonNull(GraphQLString)},
            email:{type:new GraphQLNonNull(GraphQLString)},
            role:{type:new GraphQLNonNull(UserRoleType)},
            firstName:{type:GraphQLString},
            lastName:{type:GraphQLString},
            password:{type:new GraphQLNonNull(GraphQLString)}
        }
    }
)

//b) Input type for creating a new course
const CourseInput=new GraphQLInputObjectType(
    {
        name:"CourseInput",
        description:"Input fields for creating new course",
        fields:{
            courseCode:{type:new GraphQLNonNull(GraphQLString)},
            courseName:{type:new GraphQLNonNull(GraphQLString)},
            description:{type:GraphQLString},
            instructorId:{type:new GraphQLNonNull(GraphQLID)},
            schedule:{type:new GraphQLNonNull(GraphQLString)},
            prerequisites:{type:GraphQLString},
            starDate:{type:GraphQLString},
            endDate:{type:GraphQLString},
            credits:{type:GraphQLFloat},
            level:{type:GraphQLString},
            term:{type:GraphQLString},
            deliveryMethod:{type:GraphQLString},
            syllabusUrl:{type:GraphQLString},
            requiredTextbooks:{type:GraphQLString}
        }
    }
)

//c) Input for creating enrollment
const EnrollmentInput=new GraphQLInputObjectType(
    {
        name:"EnrollmentInput",
        description:"Input fields for creating enrollment",
        fields:{
            studentId:{type:new GraphQLNonNull(GraphQLID)},
            courseId:{type:new GraphQLNonNull(GraphQLID)},
            status:{type:EnrollmentStatusType}
        }
    }
)

//d) Input type for creating a new Assignment
const AssignmentInput = new GraphQLInputObjectType({
  name: 'AssignmentInput',
  description: 'Input fields for creating a new assignment.',
  fields: {
    courseId: { type: new GraphQLNonNull(GraphQLID) }, // Required: The course this assignment belongs to
    instructorId: { type: new GraphQLNonNull(GraphQLID) }, // Required: The instructor creating the assignment
    title: { type: new GraphQLNonNull(GraphQLString) }, // Required
    description: { type: GraphQLString },
    dueDate: { type: new GraphQLNonNull(GraphQLString) }, // Required, e.g., "YYYY-MM-DD"
    instructions: { type: GraphQLString },
    gradingCriteria: { type: GraphQLString },
    assignmentType: { type: new GraphQLNonNull(AssignmentTypes) }, // Required
    maxPoints: { type: GraphQLFloat },
    gradingScale: { type: GraphQLString },
  },
});

// e) Input type for creating a new course module
const CourseModuleInput=new GraphQLInputObjectType(
    {
        name:"CourseModuleInput",
        description:"Input fields for creating a course module",
        fields:{
            courseId:{type:new GraphQLNonNull(GraphQLID)},
            moduleName:{type:new GraphQLNonNull(GraphQLString)},
            moduleOrder:{type:GraphQLInt}
        }
    }
)

// --- Root Mutation Type ---
// This is the entry point for all mutations (data modifications).
const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'The root mutation type for creating, updating, and deleting data.',
  fields: {
    // Creating user
    createUser:{
        type:UserType,
        description:"Create a new user",
        args:{
            input:{type:new GraphQLNonNull(UserInput)}
        },
        resolve:(parent,{input})=>{
            const newUser={
                username:input.username,
                email:input.email,
                password_hash:input.password,
                role:input.role,
                first_name:input.firstName,
                last_name:input.lastName
            };

            return createUser(newUser)
                .then(result=>{
                    const insertId=result.insertId;
                    return users()
                        .then(usersList=>usersList.find(user=>user.user_id===insertId))
                            .catch(error=>error)
                })
                    .catch(error=>console.error(`Error in a creating user mutation: ${error}`))
        }
    },

    // Create course
    createCourse:{
        type:CourseType,
        description:"Create a new course",
        args:{input:{type:new GraphQLNonNull(CourseInput)}},
        resolve:(parent,{input})=>{
            const newCourse={
                course_name:input.courseName,
                course_code:input.courseCode,
                description:input.description,
                instructor_id:input.instructorId,
                schedule:input.schedule,
                prerequisites:input.prerequisites,
                start_date:input.starDate,
                end_date:input.endDate,
                credits:input.credits,
                level:input.level,
                term:input.term,
                delivery_method:input.deliveryMethod,
                syllabus_url:input.syllabusUrl,
                required_textbooks:input.requiredTextbooks
            }

            return createCourse(newCourse)
                .then(response=>{
                    const insertId=response.insertId
                    return courses()
                        .then(coursesList=>coursesList.find(course=>course.course_id===insertId))
                            .catch(error=>console.error(`Error creating course in the mutation: \n${error}`))
                    })
                        .catch(error=>console.error(`Error creating course in the mutation: \n${error}`))

        }
    },
    // Create enrollment
    createEnrollment:{
        type:EnrollmentType,
        description:"Create a new course",
        args:{
            input:{type:new GraphQLNonNull(EnrollmentInput)}
        },
        resolve:(parent,{input})=>{
            const newCourse={
                student_id:parseInt(input.studentId),
                course_id:parseInt(input.courseId),
                status:input.status
            }
            return createEnrollment(newCourse)
                .then(response=>{
                    const insertId=response.insertId;
                    return enrollments()
                        .then(enrollmentsList=>enrollmentsList.find(enrollment=>enrollment.enrollment_id===insertId))
                            .catch(error=>console.error(`Error fetching the enrollment from mutation query: ${error}`))
                })
                    .catch(error=> console.error(`Error creating enrollment from mutation query: ${error}`))

        }
    },
    // Create course module
    createCourseModule:{
        type:CourseModuleType,
        description:"Create new course module",
        args:{
            input:{type:new GraphQLNonNull(CourseModuleInput)}
        },
        resolve:(parent,{input})=>{
            const cModule={
                course_id:parseInt(input.courseId),
                module_name:input.moduleName,
                module_order:parseInt(input.moduleOrder)
            }

            return createCourseModule(cModule)
                .then(response=>{
                    const insertId=response.insertId;
                    return courseModules()
                        .then(modules=>modules.find(mod=>mod.module_id===insertId))
                            .catch(error=>console.error(`Error fetching module in the mutation: ${error}`))
                })
                    .catch(error=>console.error(`Error creating module in the mutation: ${error}`))
        }
    },
    // Creating assignment
    createAssignment: {
      type: AssignmentType, // The type of data that the mutation will return
      description: 'Creates a new assignment.',
      args: {
        input: { type: new GraphQLNonNull(AssignmentInput) }, // The input object for the assignment
      },
      resolve: (parent, { input }) => {
        // to insert the new assignment record.
        const newAssignment = {
        //   assignment_id: mockDatabase.assignments.length > 0 ? Math.max(...mockDatabase.assignments.map(a => a.assignment_id)) + 1 : 1, // Simple ID generation
          course_id: parseInt(input.courseId),
          instructor_id: parseInt(input.instructorId),
          title: input.title,
          description: input.description || null,
          due_date: input.dueDate,
          instructions: input.instructions || null,
          grading_criteria: input.gradingCriteria || null,
          assignment_type: input.assignmentType,
          max_points: input.maxPoints || null,
          grading_scale: input.gradingScale || null,
        };

        // mockDatabase.assignments.push(newAssignment); // Add to mock database
        return createAssignment(newAssignment)
            .then(result=>{                
                const insertId=result.insertId;
                return assignments()
                    .then(assignmentsList=>assignmentsList.find(assign=>assign.assignment_id===insertId))
            })
                .catch(error=>console.error(`Error in a creating assignment mutation: ${error}`))

        // Return the newly created assignment object
        // return newAssignment;
      },
    },

  },
  
});


// --- Root Query Type ---
// This is the entry point for all queries.
const RootQuery=new GraphQLObjectType(
    {
        name:"RootQueryType",
        description:"The root query type",
        fields:{
            user:{
                type:UserType,
                args:{
                    userId:{type:GraphQLID},
                    username: { type: GraphQLString, description: 'Optional filter by username (case-insensitive).' },
                },
                resolve:(parent,args)=>{
                    return users()
                            .then(usersList=>usersList.find(user=>args.userId ?user.user_id===parseInt(args.userId):user.username===args.username)
                                ).catch(error => {
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                        });
                }
            },

            users:{
                type:new GraphQLList(UserType),
                args:{
                    role: { type: UserRoleType, description: 'Optional filter by user role (Student, Instructor, Admin).' },
                },
                resolve:(parent,args)=>{
                     return users()
                            .then(usersList=>usersList.filter(user=>user.role===args.role)
                                ).catch(error => {
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                        });
                }
            },

            course:{
                type:CourseType,
                args:{
                    courseId:{type:GraphQLID},
                    courseCode:{type:GraphQLString}
                },
                resolve:(parent,args)=>{
                    return courses()
                                .then(coursesList=>coursesList.find(course=>args.courseId?course.course_id ===parseInt(args.courseId):course.course_code === args.courseCode)
                            ).catch(error=>{
                                    console.error("\nFailed to fetch users (via .catch):", error.message);
                                    return error
                            })
                }
            },

            courses:{
                type:new GraphQLList(CourseType),
                resolve:async ()=>{
                    try {
                        const coursesList = await courses();
                        return coursesList;
                    } catch (error) {
                        console.error("\nFailed to fetch users (via .catch):", error.message);
                        return error;
                    }
                }
            },

            assignment:{
                type:AssignmentType,
                args:{assignmentId:{type:GraphQLID}},
                resolve:(parent,args)=>{
                    return mockDatabase. assignments.find(assignment=>assignment.assignment_id===parseInt(args.assignmentId))
                }
            },

            submission:{
                type: SubmissionType,
                args:{submissionId:{type:GraphQLID}},
                resolve:(parent,args)=>{
                    return mockDatabase. submissions.find(sub=>sub.submission_id===parseInt(args.submissionId))
                }
            },

            grade:{
                type:GradeType,
                args:{gradeId:{type:GraphQLID}},
                resolve:(parent,args)=>{
                    return mockDatabase. grades.find(grade=>grade.grade_id===parseInt(args.gradeId))
                }
            },

            CourseMaterialDetail:{
                type:CourseMaterialDetailType,
                args:{materialId:{type:GraphQLID}},
                resolve:(parent,args)=>{
                    const material=mockDatabase. course_materials.find(mat=>mat.material_id===parseInt(args.materialId))
                    return material;
                }
            }
        }
    }
)

// --- GraphQL Schema ---
const schema=new GraphQLSchema(
    {
        query:RootQuery,
        mutation:RootMutation,
    }
)

export default schema;
