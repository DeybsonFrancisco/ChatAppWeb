const express = require('express');
const expressHandlebars = require('express-handlebars');
const socketServer = require('socket.io');

const App = require('./app');
const Routes = require('./routes');

const deps = {
  express,
  templateEngine: expressHandlebars,
  routes: Routes,
};

const Server = new App(deps);

io = socketServer(Server.serverHttp);

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
    socket.on('chat message', (msg) => {
      io.to(room).emit('chat message', msg);
    });
    socket.on('disconnect', () => {
      socket.to(room).emit('disconnected', `disconectou ${socket.id}`);
    });
  });
});

Server.initialize();
