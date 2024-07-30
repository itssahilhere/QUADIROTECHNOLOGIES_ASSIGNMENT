import express from 'express';
import path from 'path';
import session from 'express-session';
import ejsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
//Controllers
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/userController.js';
//Middlewares
import { uploadfiles } from './src/middlewares/file-upload.middleware.js';
import { uploadImage } from './src/middlewares/file-upload.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const app=express();
app.use(cookieParser());
app.use(setLastVisit);
app.use(
    session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    })
);    
// Setup view engine settings
app.set('view engine','ejs');
app.use(express.json());
app.use(ejsLayouts);
//Parse Form data
app.use(express.urlencoded({extended: true}));
// Path of our views
app.set("views", path.join(path.resolve(),"src",'views')); 
app.use(express.static('src/views'));
app.use(express.static("public"));

// Create an instance of Controller
const ProductController=new ProductsController();
const userController = new UserController();

//User
app.get("/signup", userController.getSignup);
app.get("/login", userController.getLogin);
app.post("/signup",userController.postRegister);
app.post("/login",userController.postLogin);
app.get("/logout",userController.logout);
app.get("/postjob", userController.addJob);
app.post("/jobs",auth,uploadImage.single('png'),userController.postaddJob);
app.get('/jobs/update/:id',auth,userController.getUpdateJob);
app.post('/jobs/update/',auth, uploadImage.single('png'),userController.postUpdateJob);
app.get("/jobs/delete/:id", userController.deleteProduct);
app.get('/applicants', userController.getApplicants);
app.get("/applicants/:jobId/:applicantId", userController.getApplicantById);
app.post("/applicants/:jobId", uploadfiles.single('pdf'), userController.postApplicants);

//Job
app.get("/",ProductController.getLanding);
app.get("/jobs",ProductController.getJobs);
app.get("/jobs/:id",setLastVisit,ProductController.getJobsDetails);
app.post("/apply/:id",uploadfiles.single('pdf'),ProductController.jobposted);
app.get('/404', ProductController.get404);
app.use(function(req, res, next) {
    res.status(404).render('404'); // Render the 404 view
});

//Modal form submission
const applicants = []; // Array to store applicant data in memory

// Modal form submission
app.post("/applicants/:jobId", auth, function(req, res) {
    // Handle form submission
    // console.log("data in line 61")
    const jobId = req.params.jobId;
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const resume = req.file ? req.file.filename : ''; // Check if file exists
    // Save applicant data in memory
    applicants.push({
        jobId: jobId,
        name: name,
        email: email,
        contact: contact,
        resume: resume
    });
    res.send("Form submitted successfully!");
});

// Endpoint to fetch applicants for a specific job ID
app.get("/applicants/:jobId", auth, function(req, res) {
    const jobId = req.params.jobId;
    const jobApplicants = applicants.filter(applicant => applicant.jobId === jobId);
    // Send the first applicant found (if any) for the specified job ID
    res.json(jobApplicants.length > 0 ? jobApplicants[0] : {});
});

app.listen(3300,()=>{
    console.log("server is listening at 3300");
});