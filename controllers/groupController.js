const Group = require('../models/group');

exports.create = (req, res) => {
    if(new Set(req.body.users).size != req.body.users.length){
        res.status(400).send("You can't add the same user twice"); 
    }
    const new_group = new Group(req.body);
    new_group.save((err) => {
        if (err){ 
            res.status(400);
            res.send(err.message)
        }
        else{
            res.status(201);
        }
        res.end();
    });
};

exports.getAll = (req, res) => {
    Group.find({})
    .populate('users')
    .exec()
    .then((groups) =>{
        res.json(groups);
        res.status(200);
        res.end();
    });
}

exports.getOne = (req, res) => {
    const group_id = req.params.group_id;
    Group.findById(group_id)
    .then((group) =>{
        if(group == null){
            res.status(404).end();
        }
        else{
            res.json(group);
            res.status(200);
        }
    });
}

exports.updateName = (req, res) => {
    const group_id = req.params.group_id;
    const group_name = req.body.name;
    Group.findByIdAndUpdate(group_id, { $set: { 
        name: group_name 
      }    
    })
    .then((group) =>{
        if(group == null){
            res.status(404).end();
        }
        else{
            res.send(`Group ${group._id} succesfully updated`);
            res.status(200);
        }
        res.end();
    });
}

exports.addUserToGroup = (req, res) => {
    const group_id = req.params.group_id;
    const user_id = req.body.user_id
    Group.findById(group_id)
    .then((group) =>{
        if(group == null){
            res.status(404).end();
        }
        else{
            if(!group.users.map((user) => user.toString()).includes(user_id)){
                group.update({$push: {users: user_id}})
                .then(() =>{
                    res.status(201);
                    res.send(`User succesfully added to group ${group._id}`);
                });
            }
            else{
                res.status(400); 
                res.send("User already in group");
            }
        }
    });
}

exports.removeUserFromGroup = (req, res) => {
    const group_id = req.params.group_id;
    const user_id = req.params.user_id;
    Group.findOne({ _id: group_id, users: user_id})
    .then((group, err) => {
        if(group == null){
            res.status(404).end();
        }
        else{
            let delete_or_update;
            let message;
            if(group.users.length <= 2){
                delete_or_update = Group.findByIdAndDelete(group_id);
                message = `Group ${group._id} deleted because it can't have less than two users in it`;
            }
            else{
                delete_or_update = Group.findByIdAndUpdate(group_id, {$pull: {users: user_id}});
                message = `User ${user_id} succesfully removed from group ${group._id}`;
            }
            delete_or_update.then(() =>{
                res.status(200);
                res.send(message);
            });
        } 
    });
}