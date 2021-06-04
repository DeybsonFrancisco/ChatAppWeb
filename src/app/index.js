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
  socket.on('join-room', ({ room, nickName }) => {
    socket.join(room);
    socket.to(room).emit('user-connect-room', nickName);
    socket.on('chat message', ({ nickName, msg }) => {
      socket.to(room).emit('chat message', { nickName, msg });
    });
    socket.on('disconnect', () => {
      socket.to(room).emit('disconnected', `disconectou ${socket.id}`);
    });
  });
});

Server.initialize();
