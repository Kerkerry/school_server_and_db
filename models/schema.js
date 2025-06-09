import { GraphQLEnumType, GraphQLFloat, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

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
                            return course.filter(course=>course.instructor_id === parent.user_id)
                        }
                        return []
                    }
                },
                enrollments:{
                    type:new GraphQLList(EnrollmentType),
                    resolve:(parent)=>{
                        if(parent.role=='Student'){
                            return enrollents.filter(enrollment=>enrollment.student_id === parent.user_id)
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
                    resolve: (parent)=>{
                        return users.find(user=>user.user_id == parent.instructor_id)
                    }
                },
                // Relationship to Enrollments (One-to-Many)
                enrollments:{
                    type:new GraphQLList(EnrollmentType),
                    resolve:(parent)=>{
                        return enrollments.filter(enrollment=>enrollment.course_id === parent.course_id)
                    }
                },
                // Relationship to Assignments (One-to-Many)
                assignments:{
                    type:new GraphQLList(AsignmentType),
                    resolve: (parent)=>{
                        return assignments.filter(assignment=>assignment.course_id=parent.course_id)
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
                    resolve:(parent)=>{
                        return users.find(user=>user.user_id===parent.student_id);
                    }
                },
                // Relationship to Course (Many-to-One)
                course:{
                    type:CourseType,
                    resolve:(parent)=>{
                        return courses.find(course=>course.course_id ===parent.course_id)
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
                    resolve:(parent)=>{
                        return course.find(course=>course.course_id===parent.course_id)
                    }
                },
                // Many-to-One with Users (many assignments are created by one instructor).
                instructor:{
                    type:UserType,
                    resolve:(parent)=>{
                        return users.find(user=>user.user_id===parent.instructor_id)
                    }
                },
                // One-to-Many with Submissions (an assignment has many submissions).
                submissions:{
                    type:new GraphQLList(SubmissionType),
                    resolve:(parent,{studentId})=>{
                        let submissions= submissions.filter(submission=>submission.assignment_id===parent.assignment_id)
                        if(studentId){
                            submissions= submissions.filter(sub=>sub.student_id===parseInt(studentId));
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
                        return assignemnts.find(assignment=>assignment.assignment_id==parent.assignment_id)
                    }
                },
                // Many-to-One with Users (many submissions are made by one student).
                student:{
                    type:UserType,
                    resolve:(parent)=>{
                        return users.find(user=>user.user_id===parent.student_id)
                    }
                },
                // One-to-One with Grades (each submission can have one grade).
                grade:{
                    type:GradeType,
                    resolve:(parent)=>{
                        return grades.find(grade=>grade.grade_id===parent.grade_id)
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
                        return submissions.find(sub=>sub.submission_id===parent.submission_id)
                    }
                },
                // Many-to-One with Users (many grades are given by one instructor).
                gradedBy:{
                    type:UserType,
                    resolve:(parent)=>{
                        return users.find(user=>user.user_id===parent.user_id)
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
                        let module=course_modules.find(m=>m.module_id===material.module_id)
                        return module ? module.module_name:null
                    }
                },

                moduleOrder:{
                    type:GraphQLInt,
                    resolve:(material)=>{
                        let module=course_modules.find(m=>m.module_id===material.module_id)
                        return module ? module.module_order : null
                    }
                },

                courseCode:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        let course= courses.find(course=>course_id===parent.course_id);
                        return course ? course.course_code:null
                    }
                },

                courseName:{
                    type:GraphQLString,
                    resolve:(parent)=>{
                        let course= courses.find(course=>course_id===parent.course_id);
                        return course ? course.course_name:null
                    }
                },

                uploadedBy:{
                    type:UserType,
                    resolve:(parent)=>{
                        let user= users.find(user=>user.user_id===parent.uploaded_by)
                        return user ? user.username :null
                    }
                },

                uploadedByRole:{
                    type:UserType,
                    resolve:(parent)=>{
                        let user= users.find(user=>user.user_id===parent.uploaded_by)
                        return user ? user.role :null
                    }
                }
            }
        )
    }
)
