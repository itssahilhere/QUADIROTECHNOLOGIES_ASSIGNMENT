export const applicants = [
    // new ApplicantModel(),
];

export default class ApplicantModel{

    constructor(_jobId, _name, _email, _contact, _resume){
        this.id = applicants.length + 1;
        this.jobId = _jobId;
        this.name = _name;
        this.email = _email;
        this.contact = _contact;
        this.resume = _resume;
    }

    static getAll() {
        return applicants;
    }
    
    static add(jobId, id, name, email, contact, resume){
        // console.log("inside add funtion")
        let newApplicant = new ApplicantModel(
            jobId,
            id,
            name, 
            email, 
            contact, 
            resume
        );
        applicants.push(newApplicant);
    }
    
    // Add a static method to retrieve a specific applicant by ID for a job listing
    static getById(jobId, applicantId) {
        const jobApplicants = applicants.filter(applicant => applicant.jobId === jobId);
        const applicant = jobApplicants.find(applicant => applicant.id === applicantId);
        return applicant;
    }

    static updateApplicants(id) {
        // const job = products.find(job => job.id === id);
        const job = ProductModel.getById(id);
        if (job) {
            job.numberofapplicant += 1;
        }
    }

    // static update(productObj){
    //   const index = products.findIndex( (p) => p.id == productObj.id );
    //   products[index] = productObj;
    // }

    // static delete(id){
    //   const index = products.findIndex( (p) => p.id == id );
    //   products.splice(index, 1);
    // }
}