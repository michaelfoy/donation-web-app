'use strict';

const Hapi = require('hapi');
var server = new Hapi.Server();
server.bind({
  donations: [],
  users: [],
});

server.connection({ port: process.env.PORT || 4000 });
server.register([require('vision'), require('inert')], err => {

  if (err) {
    throw err;
  }

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layout',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });

  server.route(require('./routes'));
  server.start(err => {
    if (err) {
      throw err;
    }

    console.log('Server listening at:', server.info.uri);
  });
});

