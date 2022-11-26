const { BadError } = require("../errors/base");

function validate(Schema){
    return function(req, res, next) {
        const validationData = req.body;
        const result = Schema.validate(validationData);
        if(result.error) {
            next(new BadError(result.error.details[0].message));
        } else {
            next();
        }
    }
}

module.exports = {
    validate
}