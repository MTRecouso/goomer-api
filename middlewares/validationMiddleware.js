const validator = require('validator');

exports.validateObjectId = (req, res, next) =>{
    for (const key of Object.keys(req.params)) {
        if(!validator.isMongoId(req.params[key])){
            res.status(422).send("Invalid ID format");
        }
    }
    next();
}