const IndexController = require('./../controllers/IndexController');
const WelcomeController = require('./../controllers/admin/welcomeController');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


module.exports = (app) => {

   //Welcome landing page
  app.get('/', IndexController.index);

  //Company Profile Page
  app.get('/company-profile', IndexController.companyProfile);  

  //about page
  app.get('/about', IndexController.about);  
  

  //Service list
  app.get('/services', IndexController.services );
  app.get('/service-show/:id', IndexController.serviceShow);


  //transfers booking form
  app.get('/term-policies', IndexController.termPolicy );


  //Contact page
  app.get('/contact-us', IndexController.contact);

  //Maps
  app.get('/maps', IndexController.maps);
  app.get('/geocode/:id', IndexController.geocode);
  app.get('/geocode', IndexController.geocode);

}