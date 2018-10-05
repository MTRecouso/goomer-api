const User = require('../models/user');

exports.create = (req, res) => {
    const new_user = new User(req.body);
        new_user.save((err) => {
            if (err){
                res.status(400);
                res.send(err.message);
            }
            else{
                res.status(201);
                res.send('User succesfully created');
            }
        });
};

exports.getAll = (req, res) => {
    User.find({})
    .exec()
    .then((users) =>{
        res.status(200);
        res.json(users);
    });
};


exports.getOne = (req, res) => {
    const user_id = req.params.user_id;
    User.findById(user_id)
    .then((user) =>{
        if(user == null){
            res.status(404).end();
        }
        else{
            res.json(user);
            res.status(200);
        }
    });
}

exports.updateOne = (req, res) => {
    const user_id = req.params.user_id;
    const new_user = req.body;
    User.findByIdAndUpdate(user_id, new_user)
    .then((user) =>{
        if(user == null){
            res.status(404).end();
        }
        else{
            res.status(200);
            res.send(`User ${user._id} succesfully updated`);
        }
    });
}

exports.deleteOne = (req, res) =>{
    const user_id = req.params.user_id;
    User.findByIdAndDelete(user_id)
    .then((user) =>{
        if(user == null){
            res.status(404).end();
        }
        else{
            res.status(200);
            res.send(`User ${user._id} succesfully deleted`);
        }
    });
}