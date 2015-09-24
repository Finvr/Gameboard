var userController = require('./controllers/userController.js'),
    gameController = require('./controllers/gamePostsController.js');


module.exports= function (app){

  //User Routes
  app.get('/users/logout', function (req, res) {
    req.logout();
    res.redirect('/')
  })

  app.get('/me', function (req, res) {
    res.send('Authenticate the session');
  })

  app.get('/me/gameposts', function (req, res) {
    gameController.getUserGamePosts(req, res);
  }) 

  //GamePosts Routes
  app.get('/gameposts', function (req, res) {
    gameController.getAllGameposts(req, res);
  })

  app.post('/gameposts', function (req, res) {
    gameController.createGamepost(req, res);
  })


}

  


