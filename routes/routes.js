import scontroller from "../controllers/students_controller.js";
import acontroller from "../controllers/app_controllers.js";
import instructors from "../controllers/instructors_controller.js";
import courses_controller from "../controllers/courses_controller.js";
import express from 'express'

const Router=express.Router();
Router.get("/", acontroller.index);
// Student
Router.get('/students',scontroller.students)
Router.get("/students/:id",scontroller.student)
Router.post("/student",scontroller.create_student)
Router.put('/update_student',scontroller.updateStudent)
// Course Materails
Router.get("/course_materials",scontroller.course_materials)
Router.get("/course_materials/:id",scontroller.course_material)
// Instructors
Router.get('/instructors',instructors.instructors)
Router.get('/instructors/:id',instructors.instructor_courses)
// Courses
Router.get("/courses",courses_controller.courses)
Router.get("/courses/:id",courses_controller.course)

export default Router;