//Import the required modules
const express = require("express");
const router = express.Router();

//Import the controllers

//Course Controllers Import
const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/Course");

//Categories Controllers Import
const {showAllCategories, createCategory, categoryPageDetails} = require("../controllers/Category");

//Sections Controllers Import
const {createSection, updateSection, deleteSection} = require("../controllers/Section");

//Sub-section Controllers Import
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection");

//Rating and Reviews Controllers Import
const {createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");

// Importing Middlewares
const {auth, isInstructor, isStudent, isAdmin} = require("../middleware/auth");



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************


// Courses can Only be Created by Instructors  
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);



//********************************************************************************************************
//                                   Category routes (Only by Admin)
// *******************************************************************************************************


//Category can Only be created By Admin

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);



// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************



//Rating And Reviews

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);