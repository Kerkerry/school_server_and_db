// --- Mock Database (Simulating your MySQL data) ---
// In a real application, this would be your actual database connection and queries.

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

export default mockDatabase;