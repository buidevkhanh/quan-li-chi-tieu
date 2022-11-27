const { AppError } = require("./base");

exports.hanleErrors = 
    function(app) {
        app.use(function (err, req, res, next){
            if(err instanceof AppError) {
                res.status(400).json(err.getError());
            } else {
                console.log(err);
                res.status(400).json({error: 'An error has occurred with the system, please contact us to fix it'});
            }
        })
    }