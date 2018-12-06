var models = require('../models');
var dbConnection = require('../db/index.js').dbConnection;
console.log('************', dbConnection);

module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('#######1', req);
      //console.log('#######2', res);
      let queryString = 'SELECT * FROM chats';
      dbConnection.connect();
      dbConnection.query(queryString, [], function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log('@@@@@@@@@@@', results);
        }
      });
      dbConnection.end();
    }, // a function which handles a get request for all messages
    post: function (req, res) {

    }, // a function which handles posting a message to the database
    options: function (req, res) {
      sendResponse(res, null);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) { },
    post: function (req, res) { },
    options: function (req, res) {
      sendResponse(res, null);
    }
  }
};

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

sendResponse = function (response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};
