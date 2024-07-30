import { body, validationResult } from "express-validator";

const validateRequest =  async (req, res, next) => {
    
    //1. Setup rules for validation
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Input correct Email Address"),
        body('contcat').isLength({ min: 10, max: 10 }).withMessage("Phone number should be 10 digits"),
        body('resume').custom((value, {req}) => {
            if(!req.file){
                throw new Error('Resume is required');
            }
            // Check if the uploaded file is a PDF
            if (!value.endsWith('.pdf')) {
                throw new Error('Resume must be in PDF format');
            }
            return true;
        }),
    ];
    //2. Run those rules
    await Promise.all(
        rules.map( (rule) => rule.run(req))
    );

    //3. Check if there are any errors after running the rules
    var validationErrors = validationResult(req);
    // console.log(req);
    console.log(validationErrors);

    //4. Return the error message if the errors are there
    if(!validationErrors.isEmpty()) {
        return res.render('applicants', {
            errorMessage: validationErrors.array()[0].msg,
        });
    }
    next();
};

export default validateRequest;