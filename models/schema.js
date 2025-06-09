import { GraphQLEnumType, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType,GraphQLInputObjectType, GraphQLNonNull, GraphQLSchema, GraphQLString } from "graphql";
import connection from './connection.js'
// --- Mock Database (Simulating your MySQL data) ---
// In a real application, this would be your actual database connection and queries.

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
// users0()
// .then(usersList=>{
//     console.log("\nFetched users (via .then):");
//     console.log(usersList);
// })
// .catch(error => {
//         console.error("\nFailed to fetch users (via .catch):", error.message);
//     });


const mockDatabase = {
  users: [
    { user_id: 1, username: 'johndoe', email: 'john.doe@university.edu', role: 'Student', first_name: 'John', last_name: 'Doe' },
    { user_id: 2, username: 'janesmith', email: 'jane.smith@university.edu', role: 'Student', first_name: 'Jane', last_name: 'Smith' },
    { user_id: 6, username: 'dr.evans', email: 'e.evans@university.edu', role: 'Instructor', first_name: 'Emily', last_name: 'Evans' },
    { user_id: 7, username: 'prof.davis', email: 'd.davis@university.edu', role: 'Instructor', first_name: 'David', last_name: 'Davis' },
  ],
  courses: [
    { course_id: 101, course_name: 'Intro to CS', course_code: 'CS101', instructor_id: 6, description: 'Fundamentals of programming.', credits: 3.0 },
    { course_id: 102, course_name: 'Calculus I', course_code: 'MA201', instructor_id: 7, description: 'Differential and integral calculus.', credits: 4.0 },
    { course_id: 103, course_name: 'Database Systems', course_code: 'CS305', instructor_id: 6, description: 'Relational databases.', credits: 3.0 },
  ],
  enrollments: [
    { enrollment_id: 1, student_id: 1, course_id: 101, status: 'Enrolled' },
    { enrollment_id: 2, student_id: 1, course_id: 102, status: 'Enrolled' },
    { enrollment_id: 3, student_id: 2, course_id: 101, status: 'Enrolled' },
  ],
  assignments: [
    { assignment_id: 1, course_id: 101, instructor_id: 6, title: 'PA1: Factorial', description: 'Write a Python program.', due_date: '2024-09-20', max_points: 100.00 },
    { assignment_id: 2, course_id: 101, instructor_id: 6, title: 'Quiz 1', description: 'MCQ on Python basics.', due_date: '2024-09-25', max_points: 20.00 },
    { assignment_id: 3, course_id: 102, instructor_id: 7, title: 'Calc HW1', description: 'Limits and continuity problems.', due_date: '2024-09-22', max_points: 50.00 },
  ],
  submissions: [
    { submission_id: 1, assignment_id: 1, student_id: 1, submission_date: '2024-09-19', file_path: '/sub/pa1_john.py' },
    { submission_id: 2, assignment_id: 1, student_id: 2, submission_date: '2024-09-20', file_path: '/sub/pa1_jane.py' },
    { submission_id: 3, assignment_id: 3, student_id: 1, submission_date: '2024-09-21', file_path: '/sub/calc_hw1_john.pdf' },
  ],
  grades: [
    { grade_id: 1, submission_id: 1, score: 95.00, feedback_text: 'Excellent work!', graded_by: 6 },
    { grade_id: 2, submission_id: 2, score: 88.00, feedback_text: 'Good attempt.', graded_by: 6 },
    { grade_id: 3, submission_id: 3, score: 45.00, feedback_text: 'Review problem 3.', graded_by: 7 },
  ],
  course_modules: [ // Added mock data for course_modules
    { module_id: 1, course_id: 101, module_name: 'Introduction to Programming', module_order: 1 },
    { module_id: 2, course_id: 101, module_name: 'Data Types and Variables', module_order: 2 },
    { module_id: 3, course_id: 102, module_name: 'Limits and Continuity', module_order: 1 },
    { module_id: 4, course_id: 103, module_name: 'Relational Model', module_order: 1 },
  ],
  course_materials: [ // Added mock data for course_materials
    { material_id: 1, course_id: 101, module_id: 1, title: 'Lecture 1 Slides', description: 'Intro to CS concepts.', file_path: '/materials/lec1.pdf', file_type: 'PDF', uploaded_by: 6 },
    { material_id: 2, course_id: 101, module_id: 2, title: 'Python Basics Video', description: 'Video on Python variables.', file_path: '/materials/py_video.mp4', file_type: 'MP4', uploaded_by: 6 },
    { material_id: 3, course_id: 102, module_id: 3, title: 'Calculus Notes', description: 'Notes on limits.', file_path: '/materials/calc_notes.pdf', file_type: 'PDF', uploaded_by: 7 },
    { material_id: 4, course_id: 103, module_id: 4, title: 'Database ERD Guide', description: 'Guide to Entity-Relationship Diagrams.', file_path: '/materials/erd_guide.pdf', file_type: 'PDF', uploaded_by: 6 },
  ],
};


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
                password:{type:GraphQLString},
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
                            return mockDatabase.enrollments.filter(enrollment=>enrollment.student_id === parent.user_id)
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
                        return mockDatabase.enrollments.filter(enrollment=>enrollment.course_id === parent.course_id)
                    }
                },
                // Relationship to Assignments (One-to-Many)
                assignments:{
                    type:new GraphQLList(AssignmentType),
                    resolve: (parent)=>{
                        return mockDatabase.assignments.filter(assignment=>assignment.course_id=parent.course_id)
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
                                .then(coursesList=>coursesList.find(course=>course.course_id ===parent.course_id)
                            ).catch(error=>{
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
                        let submissions=mockDatabase. submissions.filter(submission=>submission.assignment_id===parent.assignment_id)
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
                        return mockDatabase. assignments.find(assignment=>assignment.assignment_id==parent.assignment_id)
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
                        return mockDatabase. grades.find(grade=>grade.grade_id===parent.grade_id)
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
                        return mockDatabase. submissions.find(sub=>sub.submission_id===parent.submission_id)
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
                        let module=mockDatabase.course_modules.find(m=>m.module_id===material.module_id)
                        return module ? module.module_name:null
                    }
                },

                moduleOrder:{
                    type:GraphQLInt,
                    resolve:(material)=>{
                        let module=mockDatabase.course_modules.find(m=>m.module_id===material.module_id)
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
                                .then(coursesList=>coursesList.find(course=>course.course_id ===parent.course_id)
                            ).catch(error=>{
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

// --- Input Types for Mutations ---
// Input type for creating a new Assignment
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

// --- Root Mutation Type ---
// This is the entry point for all mutations (data modifications).
const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'The root mutation type for creating, updating, and deleting data.',
  fields: {
    createAssignment: {
      type: AssignmentType, // The type of data that the mutation will return
      description: 'Creates a new assignment.',
      args: {
        input: { type: new GraphQLNonNull(AssignmentInput) }, // The input object for the assignment
      },
      resolve: (parent, { input }) => {
        // In a real application, you would interact with your database here
        // to insert the new assignment record.
        const newAssignment = {
          assignment_id: mockDatabase.assignments.length > 0 ? Math.max(...mockDatabase.assignments.map(a => a.assignment_id)) + 1 : 1, // Simple ID generation
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

        mockDatabase.assignments.push(newAssignment); // Add to mock database

        // Return the newly created assignment object
        return newAssignment;
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
                args:{userId:{type:GraphQLID}},
                resolve:(parent,args)=>{
                    // return users.find(user=>user.user_id===parseInt(args.userId))
                    return users()
                            .then(usersList=>usersList.find(user=>user.user_id===parseInt(args.userId))
                                ).catch(error => {
                                            console.error("\nFailed to fetch users (via .catch):", error.message);
                                            return error
                                        });
                }
            },

            users:{
                type:new GraphQLList(UserType),
                resolve:async()=>await users()
            },

            course:{
                type:CourseType,
                args:{courseId:{type:GraphQLID}},
                resolve:(parent,args)=>{
                    courses()
                                .then(coursesList=>coursesList.find(course=>course.course_id ===parent.course_id)
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
