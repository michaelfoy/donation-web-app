'use strict';
const Donation = require('../models/donation');

exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Make a Donation' });
  },

};

exports.donate = {

  handler: function (request, reply) {
    let data = request.payload;
    //var donorEmail = request.auth.credentials.loggedInUser;
    data.donor = request.auth.credentials.loggedInUser;
    const donation = new Donation(data);
    donation.save().then(newDonation => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.report = {

  handler: function (request, reply) {
    Donation.find({}).exec().then(allDonations => {
      reply.view('report', {
        title: 'Donations to Date',
        donations: allDonations,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
