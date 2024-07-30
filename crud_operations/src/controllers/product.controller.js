import {mail} from "../mailing/mail.js"
import ProductModel from "../models/product.model.js"

export default class ProductsController{
    getLanding(req,res){
        res.render('index',{userEmail:req.session.userEmail,name:req.session.userName})
    }
    getJobs(req,res){
        let products = ProductModel.get()
        res.render('jobs',{products:products,userEmail:req.session.userEmail,name:req.session.userName})
    }
    getJobsDetails(req,res){
        const id = req.params.id
        const find = ProductModel.getById(id);
        res.render('job-details',{find:find,userEmail:req.session.userEmail,name:req.session.userName})
    }
    jobposted(req,res){
         // req.session.destroy((err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         res.clearCookie('lastVisit');
        //         const { email } = req.body;
        //         mail(email);
        //         const id = req.params.id;
        //         ProductModel.updateapplicants(id);
        //         res
        //     }
        // });
        // console.log("insidejobposted");
        res.clearCookie('lastVisit');
        const { email } = req.body;
        mail(email);
        const id = req.params.id;
        ProductModel.updateapplicants(id);
        res.redirect("/jobs");
    }
    get404(req,res, next){
        res.render('404');
    }
}