import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import ApplicantModel from '../models/applicants.model.js';
import { uploadfiles } from '../middlewares/file-upload.middleware.js';

export default class UserController {
    getSignup(req, res){
        res.render('signup');
    }
    getLogin(req, res) {
        res.render('login', { message: null }); 
    }
    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render('login', { message: null });
    }
    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValid( email, password);
        if (!user) {
            return res.render('login', {
            message: 'User not found. Kindly register',
            });
        }
        req.session.userEmail = email;
        req.session.userName = user.name;
        res.render('index', {userEmail:req.session.userEmail,name:req.session.userName});
        // console.log("login successful")
    }

    getApplicants(req,res, next){
        const allApplicants = ApplicantModel.getAll();
        // console.log("All applicants:", allApplicants); // Add this line
        res.render("applicants", { applicants: allApplicants, userEmail: req.session.userEmail });
    }
    postApplicants(req, res, next) {
        //let applicants = [];
        // const { name, email, contact } = req.body;
        // if (!req.file || !req.file.filename) {
        //     return res.status(400).send("Resume is required");
        // }
        
        // const resume = `/pdf/${req.file.filename}`;
        // const jobId = req.params.jobId;
        // // Add the new applicant to the applicants array
        // // applicants.push({
        // //     jobId: jobId,
        // //     name: name,
        // //     email: email,
        // //     contact: contact,
        // //     resume: resume
        // // });
        // ApplicantModel.add(jobId, name, email, contact, resume);

        // // console.log("here applicants", applicants)
        // ApplicantModel.add(jobId, name, email, contact, resume)
        // res.send("Applicant added successfully!");

        const { name, email, contact } = req.body;
        if (!req.file || !req.file.filename) {
            return res.status(400).send("Resume is required");
        }
        
        const resume = `/pdf/${req.file.filename}`;
        const jobId = req.params.jobId;
        
        // Add the new applicant to the applicants using ApplicantModel        
        ApplicantModel.add(jobId, name, email, contact, resume);
        console.log("Applicant added:", name, email); // Add this line
        res.send("Applicant added successfully!");

    }
    // Method to retrieve a specific applicant by ID for a job listing
    getApplicantById(req, res, next) {
        const jobId = req.params.jobId;
        const applicantId = req.params.applicantId;

        const jobApplicant = ApplicantModel.getById(jobId, applicantId);

        if (!jobApplicant) {
            return res.status(404).send("Applicant not found");
        }

        res.json(jobApplicant);
    }


    addJob(req,res){
        res.render("addnewjob",{userEmail:req.session.userEmail,name:req.session.userName});
    }
    postaddJob(req,res){
        // console.log(req.body); 
        // ProductModel.addProduct(req.body);
        // let products=ProductModel.get();
        // res.render('jobs',{products:products,userEmail:req.session.userEmail,name:req.session.userName});

        // Check if file was uploaded successfully
        if (!req.file) {
            // Handle the case where no file was uploaded
            console.log("No file uploaded");
            // You can return an error response or render a specific error page
            return res.status(400).send("No file uploaded");
        }

        // File was uploaded successfully, proceed with adding the job
        const image = req.file.path; // Get the path of the uploaded image
        req.body.image = image; // Add image path to the request body

        // Now, you can save the job details including the image URL
        ProductModel.addProduct(req.body);

        // Redirect or render the appropriate view
        let products = ProductModel.get();
        res.render('jobs', { products: products, userEmail: req.session.userEmail, name: req.session.userName });

    }
    
    getUpdateJob(req,res){
        const id=req.params.id
        const upadtejob=ProductModel.getById(id)
        if(upadtejob){
            res.render('updateform',{product:upadtejob,userEmail:req.session.userEmail,name:req.session.userName})
        }
        else{
            res.render('jobs',{message:'Job not found'})
        }
    }
    postUpdateJob(req,res){
        // ProductModel.update(req.body);
        // let products=ProductModel.get();
        // res.render('jobs',{products:products,userEmail:req.session.userEmail,name:req.session.userName});

        if (req.file) {
            // File was uploaded successfully, proceed with updating the job
            const imagePath = "/images/" + req.file.filename; // Construct the correct image path
            req.body.image = imagePath; // Update image path in the request body
        }

        // Update the product details
        ProductModel.update(req.body);
        let products=ProductModel.get();
        res.render('jobs',{products:products,userEmail:req.session.userEmail,name:req.session.userName});

    }

    deleteProduct(req, res) {
        const id = req.params.id;
        ProductModel.delete(id);
        let products = ProductModel.get();
        res.render('jobs',{products:products,userEmail:req.session.userEmail,name:req.session.userName})
    }

    logout(req, res) {
        // on logout, destroy the session
        req.session.destroy((err) => {
        if (err) {
        console.log(err);
        } else {
        res.redirect('/');
        }
        });
    }
                
}