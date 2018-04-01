const apiKey = "YVh0gHwdibyTuURaPYlAy5xbkx7uaC0B";
var axios = require("axios");
var attractions = require('../controller/attractions_controller');
var users = require('../controller/user_controller');

module.exports = function(app) {
  
  //ex. http://localhost:5000/resultpage/drake
  app.route('/resultpage/:keyword').get(attractions.listAttractions);
  
  //ex. http://localhost:5000/mappage/K8vZ9175g2f
  app.route('/mappage/:keyword').get(attractions.listEvents);
  
  //ex. http://localhost:5000/eventdetailspage/K8vZ9175g2f&Z7r9jZ1AeGSoe
  app.route('/eventDetailsPage/:keyword').get(attractions.listEventDetails);

};

