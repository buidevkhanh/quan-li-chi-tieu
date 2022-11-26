class AppError{
    code;
    message;
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    getError(){
        return {
            code: this.code,
            message: this.message,
            timestamps: new Date().toISOString()
        }
    }
}

class BadError extends AppError{
    constructor(message){
        super(400, message);
    }
}

class UnauthornizedError extends AppError {
    constructor(message){
        super(401, message);
    }
}

class ForbiddenError extends AppError {
    constructor(message){
        super(403, message);
    }
}

module.exports = {
    BadError,
    UnauthornizedError,
    ForbiddenError,
    AppError
}