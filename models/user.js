var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        validate:  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,24}$/
    },
    name: {
        type: String, 
        required: true
    },
    cpf: {
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return v.length == 11;
            }
         }, 
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length == 10 || v.length == 11;
            }
         }, 
    },
    address: {
        type: String, 
        required: true
    },
  }
);

UserSchema.pre('find', function() {
    this.select('-password');
});

UserSchema.pre('findOne', function() {
    this.select('-password');
});

//Export model
module.exports = mongoose.model('User', UserSchema);