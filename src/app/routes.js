const { Router } = require('express');

const routes = Router();

routes.route('/').get((req, res) => res.render('home'));

routes.route('/room').get((req, res) => {
  const num = req.query.room;
  res.render('chat', { num });
});

module.exports = routes;
