//The controller handling all CRUD operations on users

var User = require('mongoose').model('User');
var passport = require('passport');

//Create a new user
exports.create = function(req, res, next) {
  console.log(req.body)
  var user = new User(req.body); //Creates a new User from the req.body
  user.save(function(err) { //save stores this new item in the database
       if (err) {
         return next(err);
       } else {
         res.json(user);
       }
  });
};

//Lists all users in JSON format
exports.list = function(req, res, next) {
  User.find({}, function(err, users) { //find looks for all items satisfying the given conditions in the database
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

//Find one particular user using their unique id
exports.find = function(req, res, next, id) {
  User.findOne({_id: id}, function(err, user) { //findOne takes looks for the first item satisfying the given conditions in the database
    if (err) {
      return next(err);
    } else {
      req.user = user; //set req.user to the found user.
      next();
    }
  });
};

//Reads a found user in JSON format
exports.read = function(req, res, next) {
  res.json(req.user);
};

//Updates a found user with new fields.
exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) { //findByIdAndUpdate finds an item in the database according to a given id, takes in a replacement JSON body, and performs the update.
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

//Deletes the user that was found.
exports.delete = function(req, res, next) {
  req.user.remove(function(err) { //remove operates on an item in the database, and removes it.
    if (err) {
      return next(err);
    } else {
      res.json(req.user);
    }
  });
};

exports.signup = function(req, res, next) {
  console.log(req.user)
  //if (!req.user) {
    var user = new User(req.body);
    //var message = null;
    user.save(function(err) {
      if (err) {
          return res.send(500,err);
      }
      else{
        return res.send("Account Successfully Created")
      }
    })
      /*
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        console.log(req.user + " is now logged in!");
      });
    });
  } else {
    console.log(req.user + " is already logged in!");
  }*/
};

exports.signin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return res.send(500,info);
    }
    if (!user) {
      return res.send(500,info); //currently only working serverside - need to link with react.
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      userData = {...req.user._doc}
      delete userData.password
      delete userData.salt
      return res.send(userData); //optional
    });
  })(req, res, next);
};

exports.signout = function(req, res) {
	//clears out req.user and redirects. the redirect is crucial - or else req.user is persistent.
  req.logOut();
	res.redirect('/');
};

exports.sessionCheck = function(req,res){
  if(!req.user){
    return res.send(401);
  }
  userData = {...req.user._doc}
  delete userData.password
  delete userData.salt
  return res.send(200,userData)
}


//exports.updateFollowing = function(req, res, next) {
//  User.update({_id: req.user.id}, {$set: {'following': req.body}}, function(err, user) {
//    if (err) {
//      return next(err);
//    } else {
//      res.json(user);
//    }
//  });
//}
