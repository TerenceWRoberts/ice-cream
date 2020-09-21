var mongoose = require('mongoose');

const User = mongoose.model('userlist', { name: String, phone: String, email: String, password:String, haslogin:Boolean });

module.exports = {User};
