import scontroller from "../controllers/students_controller.js";
import acontroller from "../controllers/app_controllers.js";
import instructors from "../controllers/instructors_controller.js";
import express from 'express'

const Router=express.Router();
Router.get("/", acontroller.index);
Router.get('/students',scontroller.students)
Router.get("/students/:id",scontroller.student)
Router.get("/course_materials",scontroller.course_materials)
Router.get("/course_materials/:id",scontroller.course_material)
Router.get('/instructors',instructors.instructors)
Router.get('/instructors/:id',instructors.instructor_courses)

export default Router;