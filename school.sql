-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2025 at 11:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `post_date` datetime DEFAULT current_timestamp(),
  `scheduled_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `course_id`, `instructor_id`, `title`, `content`, `post_date`, `scheduled_date`) VALUES
(1, 1, 6, 'Welcome to CS101!', 'Welcome to the course! Please review the syllabus.', '2024-09-01 08:00:00', NULL),
(2, 1, 6, 'Assignment 1 Due Date Extension', 'Due date for PA1 extended to Sept 20th.', '2024-09-15 17:00:00', NULL),
(3, 2, 7, 'Office Hours Change', 'My office hours for this week are changed to Thursday 11 AM.', '2024-09-18 09:00:00', NULL),
(4, 3, 8, 'Guest Speaker Next Week', 'We will have a guest speaker on Oct 5th.', '2024-09-29 10:00:00', NULL),
(5, 4, 6, 'Midterm Exam Schedule', 'Midterm exam for CS305 will be on Oct 25th.', '2024-10-01 14:00:00', NULL),
(6, 7, 12, 'New Tutorial Posted', 'A new tutorial on CSS Flexbox has been uploaded to Module 2.', '2024-09-10 11:00:00', NULL),
(7, 8, 6, 'Review Session for Data Structures', 'There will be a review session on Oct 18th.', '2024-10-12 16:00:00', NULL),
(8, 1, 6, 'No Class on Friday', 'Due to a conference, CS101 class on Friday, Sept 27th is cancelled.', '2024-09-26 09:00:00', NULL),
(9, 2, 7, 'Reminder: Calculus Homework 2', 'Just a reminder that Homework 2 is due this Sunday.', '2024-09-25 15:00:00', NULL),
(10, 3, 8, 'Reading for Next Week', 'Please read Chapter 3 for next week\'s lecture.', '2024-09-27 11:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` datetime NOT NULL,
  `instructions` text DEFAULT NULL,
  `grading_criteria` text DEFAULT NULL,
  `assignment_type` enum('Essay','Quiz','Project','Other') NOT NULL,
  `max_points` decimal(10,2) DEFAULT NULL,
  `grading_scale` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `course_id`, `instructor_id`, `title`, `description`, `due_date`, `instructions`, `grading_criteria`, `assignment_type`, `max_points`, `grading_scale`) VALUES
(1, 1, 6, 'Programming Assignment 1', 'Write a Python program to calculate factorial.', '2024-09-20 23:59:59', 'Submit a .py file.', 'Correctness, Efficiency, Readability', 'Project', 100.00, 'Points'),
(2, 1, 6, 'Quiz 1: Python Basics', 'Multiple choice quiz on Python syntax.', '2024-09-25 23:59:59', 'Complete online quiz.', 'Automatic grading', 'Quiz', 20.00, 'Points'),
(3, 2, 7, 'Calculus Homework 1', 'Solve problems on limits and continuity.', '2024-09-22 23:59:59', 'Upload PDF of solutions.', 'Correctness of solutions', 'Essay', 50.00, 'Points'),
(4, 3, 8, 'Psychology Essay 1', 'Discuss the nature vs. nurture debate.', '2024-09-28 23:59:59', 'Min 1000 words, APA style.', 'Content, Structure, Argumentation', 'Essay', 75.00, 'Points'),
(5, 4, 6, 'Database Design Project', 'Design a relational database schema for a library system.', '2024-10-15 23:59:59', 'Submit ERD and schema.', 'Completeness, Normalization, Efficiency', 'Project', 150.00, 'Points'),
(6, 7, 12, 'Build a Personal Website', 'Create a simple personal website using HTML and CSS.', '2024-10-05 23:59:59', 'Submit a zip file of your project.', 'Design, Responsiveness, Code Quality', 'Project', 100.00, 'Points'),
(7, 8, 6, 'Algorithm Analysis Homework', 'Analyze the time complexity of given algorithms.', '2024-10-10 23:59:59', 'Upload PDF of solutions.', 'Correctness of analysis', 'Essay', 60.00, 'Points'),
(8, 9, 7, 'Differential Equations Problem Set 1', 'Solve first-order differential equations.', '2024-10-01 23:59:59', 'Upload PDF of solutions.', 'Correctness of solutions', 'Essay', 40.00, 'Points'),
(9, 10, 8, 'Social Psychology Reflection', 'Write a reflection on a social psychology experiment.', '2024-10-07 23:59:59', 'Min 500 words.', 'Insight, Critical Thinking', 'Essay', 50.00, 'Points'),
(10, 1, 6, 'Programming Assignment 2', 'Implement a sorting algorithm.', '2024-10-20 23:59:59', 'Submit a .py file.', 'Correctness, Efficiency', 'Project', 100.00, 'Points');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `instructor_id` int(11) NOT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `prerequisites` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `credits` decimal(3,1) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `term` varchar(50) DEFAULT NULL,
  `delivery_method` varchar(50) DEFAULT NULL,
  `syllabus_url` varchar(255) DEFAULT NULL,
  `required_textbooks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `course_code`, `description`, `instructor_id`, `schedule`, `prerequisites`, `start_date`, `end_date`, `credits`, `level`, `term`, `delivery_method`, `syllabus_url`, `required_textbooks`) VALUES
(1, 'Introduction to Computer Science', 'CS101', 'Fundamentals of programming and algorithms.', 6, 'Mon/Wed/Fri 10:00-10:50 AM', 'None', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'In-person', 'http://example.com/cs101_syllabus.pdf', 'Python Crash Course'),
(2, 'Calculus I', 'MA201', 'Introduction to differential and integral calculus.', 7, 'Tue/Thu 09:00-10:15 AM', 'Algebra', '2024-09-02', '2024-12-13', 4.0, 'Undergraduate', 'Fall 2024', 'Hybrid', 'http://example.com/ma201_syllabus.pdf', 'Calculus: Early Transcendentals'),
(3, 'Introduction to Psychology', 'PS101', 'Overview of psychological principles and research methods.', 8, 'Mon/Wed 14:00-15:15 PM', 'None', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'Online', 'http://example.com/ps101_syllabus.pdf', 'Psychology: The Science of Mind and Behavior'),
(4, 'Database Systems', 'CS305', 'Design and implementation of relational databases.', 6, 'Tue/Thu 13:00-14:15 PM', 'CS101', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'In-person', 'http://example.com/cs305_syllabus.pdf', 'Database Management Systems'),
(5, 'Linear Algebra', 'MA310', 'Vector spaces, linear transformations, eigenvalues.', 7, 'Mon/Wed/Fri 11:00-11:50 AM', 'MA201', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'In-person', 'http://example.com/ma310_syllabus.pdf', 'Linear Algebra and Its Applications'),
(6, 'Abnormal Psychology', 'PS320', 'Study of psychological disorders and their treatment.', 8, 'Tue/Thu 10:30-11:45 AM', 'PS101', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'Hybrid', 'http://example.com/ps320_syllabus.pdf', 'Abnormal Psychology: An Integrative Approach'),
(7, 'Web Development Fundamentals', 'CS220', 'Introduction to HTML, CSS, and JavaScript.', 12, 'Mon/Wed 15:00-16:15 PM', 'None', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'Online', 'http://example.com/cs220_syllabus.pdf', 'Eloquent JavaScript'),
(8, 'Data Structures and Algorithms', 'CS202', 'Advanced data structures and algorithm analysis.', 6, 'Mon/Wed/Fri 09:00-09:50 AM', 'CS101', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'In-person', 'http://example.com/cs202_syllabus.pdf', 'Introduction to Algorithms'),
(9, 'Differential Equations', 'MA320', 'Methods for solving ordinary differential equations.', 7, 'Tue/Thu 12:00-13:15 PM', 'MA201', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'In-person', 'http://example.com/ma320_syllabus.pdf', 'Elementary Differential Equations'),
(10, 'Social Psychology', 'PS210', 'Study of how individuals are influenced by others.', 8, 'Mon/Wed 11:00-12:15 PM', 'PS101', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'Online', 'http://example.com/ps210_syllabus.pdf', 'Social Psychology'),
(11, 'Operating Systems', 'CS401', 'Principles of operating system design and implementation.', 6, 'Tue/Thu 15:00-16:15 PM', 'CS202', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'In-person', 'http://example.com/cs401_syllabus.pdf', 'Operating System Concepts'),
(12, 'Introduction to Statistics', 'ST200', 'Basic statistical methods and data analysis.', 7, 'Mon/Wed/Fri 13:00-13:50 PM', 'None', '2024-09-02', '2024-12-13', 3.0, 'Undergraduate', 'Fall 2024', 'Hybrid', 'http://example.com/st200_syllabus.pdf', 'Statistics for Dummies');

-- --------------------------------------------------------

--
-- Table structure for table `course_materials`
--

CREATE TABLE `course_materials` (
  `material_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `module_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `external_url` varchar(255) DEFAULT NULL,
  `uploaded_by` int(11) NOT NULL,
  `upload_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_materials`
--

INSERT INTO `course_materials` (`material_id`, `course_id`, `module_id`, `title`, `description`, `file_path`, `file_type`, `external_url`, `uploaded_by`, `upload_date`) VALUES
(1, 1, 1, 'CS101 Lecture 1 Slides', 'Introduction to CS concepts.', '/materials/cs101/lec1.pdf', 'PDF', NULL, 6, '2024-09-01 10:00:00'),
(2, 1, 2, 'Python Variables Cheatsheet', 'Quick reference for Python variables.', '/materials/cs101/vars_cheatsheet.docx', 'DOCX', NULL, 6, '2024-09-08 11:00:00'),
(3, 1, NULL, 'Introduction to Python (Video)', 'Video lecture on Python basics.', NULL, 'MP4', 'https://www.youtube.com/watch?v=example1', 6, '2024-09-05 14:00:00'),
(4, 2, 4, 'MA201 Limits Notes', 'Detailed notes on limits.', '/materials/ma201/limits_notes.pdf', 'PDF', NULL, 7, '2024-09-03 09:30:00'),
(5, 3, 6, 'PS101 Research Methods Reading', 'Chapter 2 on research methodologies.', '/materials/ps101/chapter2.pdf', 'PDF', NULL, 8, '2024-09-04 10:00:00'),
(6, 4, 8, 'SQL Joins Tutorial', 'Interactive tutorial on SQL joins.', NULL, 'HTML', 'https://www.w3schools.com/sql/sql_join.asp', 6, '2024-09-10 15:00:00'),
(7, 7, 11, 'HTML Tags Reference', 'Comprehensive list of HTML tags.', '/materials/cs220/html_ref.pdf', 'PDF', NULL, 12, '2024-09-05 11:00:00'),
(8, 8, 12, 'Array Operations (Video)', 'Video explanation of array operations.', NULL, 'MP4', 'https://www.youtube.com/watch?v=example2', 6, '2024-09-12 10:00:00'),
(9, 1, 3, 'CS101 Control Flow Practice', 'Exercises for control flow statements.', '/materials/cs101/control_flow_practice.pdf', 'PDF', NULL, 6, '2024-09-15 13:00:00'),
(10, 2, 5, 'MA201 Differentiation Examples', 'Solved examples for differentiation.', '/materials/ma201/diff_examples.pdf', 'PDF', NULL, 7, '2024-09-18 14:00:00'),
(11, 3, 7, 'PS101 Approaches to Psychology', 'Overview of different psychological approaches.', '/materials/ps101/approaches.pptx', 'PPTX', NULL, 8, '2024-09-20 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `course_modules`
--

CREATE TABLE `course_modules` (
  `module_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `module_name` varchar(255) NOT NULL,
  `module_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_modules`
--

INSERT INTO `course_modules` (`module_id`, `course_id`, `module_name`, `module_order`) VALUES
(1, 1, 'Module 1: Introduction to Programming', 1),
(2, 1, 'Module 2: Data Types and Variables', 2),
(3, 1, 'Module 3: Control Flow', 3),
(4, 2, 'Module 1: Limits and Continuity', 1),
(5, 2, 'Module 2: Differentiation', 2),
(6, 3, 'Module 1: History and Approaches', 1),
(7, 3, 'Module 2: Research Methods', 2),
(8, 4, 'Module 1: Relational Model', 1),
(9, 4, 'Module 2: SQL Fundamentals', 2),
(10, 5, 'Module 1: Vector Spaces', 1),
(11, 6, 'Module 1: Anxiety Disorders', 1),
(12, 7, 'Module 1: HTML Basics', 1),
(13, 8, 'Module 1: Array Data Structures', 1),
(14, 9, 'Module 1: First-Order Equations', 1),
(15, 10, 'Module 1: Social Cognition', 1);

-- --------------------------------------------------------

--
-- Table structure for table `discussion_forums`
--

CREATE TABLE `discussion_forums` (
  `forum_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discussion_forums`
--

INSERT INTO `discussion_forums` (`forum_id`, `course_id`, `title`, `description`, `created_by`, `created_at`) VALUES
(1, 1, 'General Q&A', 'Ask any questions about the course material or assignments.', 6, '2024-09-01 12:00:00'),
(2, 1, 'Programming Help', 'Discuss programming challenges and solutions.', 6, '2024-09-05 10:00:00'),
(3, 2, 'Calculus Concepts', 'Discuss difficult calculus concepts.', 7, '2024-09-03 14:00:00'),
(4, 3, 'Research Methods Discussion', 'Share thoughts on different research methodologies.', 8, '2024-09-06 11:00:00'),
(5, 4, 'SQL Queries', 'Forum for discussing SQL query optimization and issues.', 6, '2024-09-12 09:00:00'),
(6, 7, 'HTML/CSS Layouts', 'Share and get feedback on your website layouts.', 12, '2024-09-07 10:00:00'),
(7, 8, 'Data Structures Problems', 'Discuss solutions to data structure problems.', 6, '2024-09-15 13:00:00'),
(8, 10, 'Social Psychology Debates', 'Debate controversial topics in social psychology.', 8, '2024-09-10 14:00:00'),
(9, 1, 'Module 1 Feedback', 'Provide feedback on Module 1 content.', 1, '2024-09-10 15:00:00'),
(10, 2, 'Exam Prep', 'Collaborate on preparing for the Calculus midterm.', 2, '2024-10-01 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_posts`
--

CREATE TABLE `discussion_posts` (
  `post_id` int(11) NOT NULL,
  `forum_id` int(11) NOT NULL,
  `parent_post_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `post_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discussion_posts`
--

INSERT INTO `discussion_posts` (`post_id`, `forum_id`, `parent_post_id`, `user_id`, `content`, `post_date`) VALUES
(1, 1, NULL, 1, 'When is the first programming assignment due?', '2024-09-02 10:30:00'),
(2, 1, 1, 6, 'PA1 is due on September 20th, John. Please check the assignments section.', '2024-09-02 11:00:00'),
(3, 2, NULL, 2, 'I am having trouble with the loop in the factorial program.', '2024-09-06 14:00:00'),
(4, 2, 3, 1, 'Jane, make sure your loop condition is correct and the variable is incrementing.', '2024-09-06 14:30:00'),
(5, 3, NULL, 3, 'Can someone explain L\'Hopital\'s Rule in simpler terms?', '2024-09-05 16:00:00'),
(6, 3, 5, 7, 'L\'Hopital\'s Rule helps evaluate limits of indeterminate forms...', '2024-09-05 16:30:00'),
(7, 4, NULL, 4, 'What are the ethical considerations in psychological research?', '2024-09-08 09:00:00'),
(8, 4, 7, 8, 'Excellent question, Bob. Ethical guidelines protect participants...', '2024-09-08 09:30:00'),
(9, 5, NULL, 5, 'How to optimize SQL queries for large datasets?', '2024-09-13 11:00:00'),
(10, 5, 9, 6, 'Indexing is crucial. Also, avoid SELECT * and use specific columns.', '2024-09-13 11:30:00'),
(11, 1, NULL, 10, 'Are there any extra credit opportunities?', '2024-09-18 10:00:00'),
(12, 1, 11, 6, 'Not at the moment, Frank. Focus on the main assignments.', '2024-09-18 10:30:00'),
(13, 7, NULL, 11, 'What are some common mistakes in HTML semantic tagging?', '2024-09-10 14:00:00'),
(14, 7, 13, 12, 'Overusing `div` instead of semantic tags like `header`, `nav`, `main`, `footer`.', '2024-09-10 14:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `enrollment_date` datetime DEFAULT current_timestamp(),
  `status` enum('Enrolled','Waitlisted','Dropped') DEFAULT 'Enrolled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `student_id`, `course_id`, `enrollment_date`, `status`) VALUES
(1, 1, 1, '2024-08-20 09:00:00', 'Enrolled'),
(2, 1, 2, '2024-08-20 09:05:00', 'Enrolled'),
(3, 2, 1, '2024-08-21 10:00:00', 'Enrolled'),
(4, 2, 3, '2024-08-21 10:05:00', 'Enrolled'),
(5, 3, 4, '2024-08-22 11:00:00', 'Enrolled'),
(6, 3, 5, '2024-08-22 11:05:00', 'Enrolled'),
(7, 4, 6, '2024-08-23 12:00:00', 'Enrolled'),
(8, 4, 7, '2024-08-23 12:05:00', 'Enrolled'),
(9, 5, 8, '2024-08-24 13:00:00', 'Enrolled'),
(10, 5, 9, '2024-08-24 13:05:00', 'Enrolled'),
(11, 10, 1, '2024-08-25 14:00:00', 'Enrolled'),
(12, 10, 10, '2024-08-25 14:05:00', 'Enrolled'),
(13, 11, 11, '2024-08-26 15:00:00', 'Enrolled'),
(14, 11, 12, '2024-08-26 15:05:00', 'Enrolled'),
(15, 1, 8, '2024-08-27 09:00:00', 'Enrolled'),
(16, 2, 10, '2024-08-27 10:00:00', 'Enrolled');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `grade_id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `feedback_text` text DEFAULT NULL,
  `feedback_audio_url` varchar(255) DEFAULT NULL,
  `graded_by` int(11) NOT NULL,
  `grade_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`grade_id`, `submission_id`, `score`, `feedback_text`, `feedback_audio_url`, `graded_by`, `grade_date`) VALUES
(1, 1, 95.00, 'Excellent work, clear and efficient code.', NULL, 6, '2024-09-25 10:00:00'),
(2, 2, 88.00, 'Good attempt, minor issues with edge cases.', NULL, 6, '2024-09-26 11:00:00'),
(3, 3, 18.00, 'Well done on the quiz.', NULL, 6, '2024-09-26 11:30:00'),
(4, 4, 45.00, 'Solid understanding, review problem 3.', NULL, 7, '2024-09-28 14:00:00'),
(5, 5, 30.00, 'Good effort, but submitted late. Content needs more depth.', NULL, 7, '2024-09-29 10:00:00'),
(6, 6, 68.00, 'Interesting points, but structure could be improved.', NULL, 8, '2024-10-01 16:00:00'),
(7, 7, 130.00, 'Comprehensive design, good use of normalization.', NULL, 6, '2024-10-20 09:00:00'),
(8, 8, 92.00, 'Visually appealing and responsive.', NULL, 12, '2024-10-08 10:00:00'),
(9, 9, 55.00, 'Correct analysis for most algorithms, some minor errors.', NULL, 6, '2024-10-15 11:00:00'),
(10, 10, 38.00, 'Solutions are mostly correct, show more steps next time.', NULL, 7, '2024-10-05 13:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `sent_at` datetime DEFAULT current_timestamp(),
  `read_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`message_id`, `sender_id`, `receiver_id`, `content`, `sent_at`, `read_status`) VALUES
(1, 1, 6, 'Professor Evans, I have a question about PA1.', '2024-09-17 10:00:00', 0),
(2, 6, 1, 'Hi John, please post your question on the discussion forum if it\'s general, or come to office hours.', '2024-09-17 10:15:00', 1),
(3, 2, 8, 'Dear Professor Taylor, could I get an extension on the essay?', '2024-09-26 15:00:00', 0),
(4, 8, 2, 'Jane, please provide a valid reason for the extension request.', '2024-09-26 15:30:00', 1),
(5, 3, 7, 'Professor Davis, I need help with problem 5 on HW1.', '2024-09-21 11:00:00', 0),
(6, 7, 3, 'Alice, I\'ll be in my office from 2-3 PM today if you want to stop by.', '2024-09-21 11:15:00', 1),
(7, 4, 5, 'Hey Charlie, want to study for the CS220 midterm together?', '2024-10-01 16:00:00', 0),
(8, 5, 4, 'Sure Bob, when are you free?', '2024-10-01 16:15:00', 1),
(9, 10, 6, 'Professor Evans, I submitted PA1. Can you confirm?', '2024-09-20 23:00:00', 0),
(10, 6, 10, 'Yes, Frank, your submission is recorded.', '2024-09-21 09:00:00', 1),
(11, 11, 12, 'Professor Wilson, I am having trouble accessing the video lecture.', '2024-09-08 10:00:00', 0),
(12, 12, 11, 'Grace, please try clearing your browser cache or using a different browser.', '2024-09-08 10:15:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `submission_id` int(11) NOT NULL,
  `assignment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `submission_date` datetime DEFAULT current_timestamp(),
  `file_path` varchar(255) DEFAULT NULL,
  `text_content` longtext DEFAULT NULL,
  `status` enum('Submitted','Late','Graded','Draft') DEFAULT 'Submitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`submission_id`, `assignment_id`, `student_id`, `submission_date`, `file_path`, `text_content`, `status`) VALUES
(1, 1, 1, '2024-09-19 22:00:00', '/submissions/john_doe/pa1.py', NULL, 'Submitted'),
(2, 1, 2, '2024-09-20 23:00:00', '/submissions/jane_smith/pa1.py', NULL, 'Submitted'),
(3, 2, 1, '2024-09-24 18:00:00', NULL, '{\"q1\": \"A\", \"q2\": \"C\"}', 'Submitted'),
(4, 3, 1, '2024-09-21 15:00:00', '/submissions/john_doe/calc_hw1.pdf', NULL, 'Submitted'),
(5, 3, 2, '2024-09-23 10:00:00', '/submissions/jane_smith/calc_hw1.pdf', NULL, 'Late'),
(6, 4, 2, '2024-09-27 20:00:00', NULL, 'The nature vs. nurture debate is complex...', 'Submitted'),
(7, 5, 3, '2024-10-14 17:00:00', '/submissions/alice_brown/db_project.zip', NULL, 'Submitted'),
(8, 7, 4, '2024-10-04 21:00:00', '/submissions/bob_white/website.zip', NULL, 'Submitted'),
(9, 8, 5, '2024-10-09 19:00:00', '/submissions/charlie_green/algo_analysis.pdf', NULL, 'Submitted'),
(10, 9, 5, '2024-09-30 22:00:00', '/submissions/charlie_green/diff_eq_ps1.pdf', NULL, 'Submitted'),
(11, 1, 10, '2024-09-20 20:00:00', '/submissions/frank_black/pa1.py', NULL, 'Submitted'),
(12, 2, 10, '2024-09-25 21:00:00', NULL, '{\"q1\": \"B\", \"q2\": \"A\"}', 'Submitted');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('Student','Instructor','Admin') NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password_hash`, `email`, `role`, `first_name`, `last_name`, `created_at`, `last_login`) VALUES
(1, 'johndoe', 'hashed_password_1', 'john.doe@university.edu', 'Student', 'John', 'Doe', '2023-01-10 09:00:00', '2024-05-28 10:30:00'),
(2, 'janesmith', 'hashed_password_2', 'jane.smith@university.edu', 'Student', 'Jane', 'Smith', '2023-01-15 10:00:00', '2024-05-29 11:00:00'),
(3, 'alicebrown', 'hashed_password_3', 'alice.brown@university.edu', 'Student', 'Alice', 'Brown', '2023-02-01 11:00:00', '2024-05-27 09:15:00'),
(4, 'bobwhite', 'hashed_password_4', 'bob.white@university.edu', 'Student', 'Bob', 'White', '2023-02-05 12:00:00', '2024-05-29 14:00:00'),
(5, 'charliegreen', 'hashed_password_5', 'charlie.green@university.edu', 'Student', 'Charlie', 'Green', '2023-03-01 13:00:00', '2024-05-28 16:00:00'),
(6, 'dr.evans', 'hashed_password_6', 'e.evans@university.edu', 'Instructor', 'Emily', 'Evans', '2022-08-01 08:00:00', '2024-05-29 09:00:00'),
(7, 'prof.davis', 'hashed_password_7', 'd.davis@university.edu', 'Instructor', 'David', 'Davis', '2022-09-10 09:30:00', '2024-05-29 13:00:00'),
(8, 'mrs.taylor', 'hashed_password_8', 't.taylor@university.edu', 'Instructor', 'Sarah', 'Taylor', '2022-10-01 10:00:00', '2024-05-28 11:00:00'),
(9, 'adminuser', 'hashed_password_9', 'admin@university.edu', 'Admin', 'System', 'Admin', '2022-07-01 07:00:00', '2024-05-29 15:00:00'),
(10, 'frankblack', 'hashed_password_10', 'frank.b@university.edu', 'Student', 'Frank', 'Black', '2023-03-15 10:00:00', '2024-05-27 10:00:00'),
(11, 'gracekelly', 'hashed_password_11', 'grace.k@university.edu', 'Student', 'Grace', 'Kelly', '2023-04-01 11:00:00', '2024-05-28 12:00:00'),
(12, 'dr.wilson', 'hashed_password_12', 'w.wilson@university.edu', 'Instructor', 'William', 'Wilson', '2022-11-01 09:00:00', '2024-05-29 10:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_code` (`course_code`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `course_materials`
--
ALTER TABLE `course_materials`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `course_modules`
--
ALTER TABLE `course_modules`
  ADD PRIMARY KEY (`module_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `discussion_forums`
--
ALTER TABLE `discussion_forums`
  ADD PRIMARY KEY (`forum_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `discussion_posts`
--
ALTER TABLE `discussion_posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `forum_id` (`forum_id`),
  ADD KEY `parent_post_id` (`parent_post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`grade_id`),
  ADD UNIQUE KEY `submission_id` (`submission_id`),
  ADD KEY `graded_by` (`graded_by`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD UNIQUE KEY `assignment_id` (`assignment_id`,`student_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `course_materials`
--
ALTER TABLE `course_materials`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `course_modules`
--
ALTER TABLE `course_modules`
  MODIFY `module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `discussion_forums`
--
ALTER TABLE `discussion_forums`
  MODIFY `forum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `discussion_posts`
--
ALTER TABLE `discussion_posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `course_materials`
--
ALTER TABLE `course_materials`
  ADD CONSTRAINT `course_materials_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `course_materials_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `course_modules` (`module_id`),
  ADD CONSTRAINT `course_materials_ibfk_3` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `course_modules`
--
ALTER TABLE `course_modules`
  ADD CONSTRAINT `course_modules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `discussion_forums`
--
ALTER TABLE `discussion_forums`
  ADD CONSTRAINT `discussion_forums_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `discussion_forums_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `discussion_posts`
--
ALTER TABLE `discussion_posts`
  ADD CONSTRAINT `discussion_posts_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `discussion_forums` (`forum_id`),
  ADD CONSTRAINT `discussion_posts_ibfk_2` FOREIGN KEY (`parent_post_id`) REFERENCES `discussion_posts` (`post_id`),
  ADD CONSTRAINT `discussion_posts_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`submission_id`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`graded_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`),
  ADD CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
