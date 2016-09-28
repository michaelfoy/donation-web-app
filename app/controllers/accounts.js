'use strict';

exports.main = {

  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Donations' });
  },

};

exports.signup = {

  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Donations' });
  },

};

exports.login = {

  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Donations' });
  },

};

exports.authenticate = {

  handler: function (request, reply) {
    const data = request.payload;
    let isUser = 0;
    this.users.forEach(function (user) {
      if ((data.email == user.email) && (data.password == user.password)) {
        isUser = 1;
        reply.redirect('/home');
      }
    });

    if (isUser == 0) {
      reply.redirect('/signup');
    };
  },
};

exports.logout = {

  handler: function (request, reply) {
    reply.redirect('/');
  },

};

exports.register = {

  handler: function (request, reply) {
    const data = request.payload;
    this.users.push(data);
    reply.redirect('/login');
  },
};