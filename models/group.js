var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GroupSchema = new Schema(
  {
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String, 
        required: false,
    },
    users: {
        type: [{type: Schema.Types.ObjectId, ref: 'User' }], 
        required: true
    },
  }
);

GroupSchema.pre('save', function(next) {
    if(this.users.length < 2){
        throw new Error("A new group must have at least two users");
    }
    next();
});

//Export model
module.exports = mongoose.model('Group', GroupSchema);