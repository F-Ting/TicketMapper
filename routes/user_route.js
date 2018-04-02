//Routes to handle CRUD operations on users
var users = require('../controller/user_controller');

module.exports = function(app) {

  app.route('/users').post(users.create)
                     .get(users.list);
  app.route('/users/:id').get(users.read)
                         .put(users.update)
                         .delete(users.delete);

  app.param('id', users.find);

  app.route('/signup').post(users.signup);
  app.route('/login').post(users.signin);
  app.route('/signout').get(users.signout);
  app.route('/session').get(users.sessionCheck);

  //  app.route('/following').put(users.updateFollowing);


};
