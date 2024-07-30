import { body, validationResult } from "express-validator";

const validateUserRequest =  async (req, res, next) => {
    
    //1. Setup rules for validation
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Email is required"),
        body('password').isStrongPassword.withMessage("Password must be strong"),
    ];
    //2. Run those rules
    await Promise.all(
        rules.map( (rule) => rule.run(req))
    );

    //3. Check if there are any errors after running the rules
    var validationErrors = validationResult(req);
    console.log(validationErrors);

    //4. Return the error message if the errors are there
    if(!validationErrors.isEmpty()) {
        return res.render('register', {
            errorMessage: validationErrors.array()[0].msg,
        });
    }
    next();
};

export default validateUserRequest;