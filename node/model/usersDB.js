var mongoose = require('mongoose')
var schema = mongoose.Schema 

var UserSchema = new schema({ 
    user_name:{                     
        type: String,
        require: true,
        
    },
    e_mail:{
        type: String,
        require: true,
    },
    pass_word:{
        type: String,
        require: true,
        
    },
    
    
}, {timestamps: true});        
module.exports = mongoose.model('users', UserSchema)