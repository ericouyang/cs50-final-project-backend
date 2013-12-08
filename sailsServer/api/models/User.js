/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

// see http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/
// see https://gist.github.com/theangryangel/5060446

var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports = {
  tableName: 'users',
  
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    firstName: {
      type: 'STRING',
      //required: true
    },
    lastName: {
      type: 'STRING',
      //required: true
    },
    email: {
      type: 'email',
      //required: true
    },
    password: {
      type: 'STRING',
      required: true
    },
    getFullName: function()
    {
        if (this.firstName !== undefined && this.lastName !== undefined)
            return this.firstName + ' ' + this.lastName;
        return '';
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.access_token;
      return obj;
    }
  },
  
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return cb(err);
      
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }
        else {
          user.password = hash;
          user.access_token = crypto.randomBytes(20).toString('hex');
          cb(null, user);
        }
      });
    });
  }
};
