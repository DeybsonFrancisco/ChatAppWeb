const { Router } = require('express');

const routes = Router();

routes.route('/').get((req, res) => res.render('home'));

routes.route('/chat').get((req, res) => {
  const roomName = req.query.room;
  res.render('chat', { roomName });
});

module.exports = routes;
