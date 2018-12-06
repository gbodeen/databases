var models = require('../models');
var dbConnection = require('../db/index.js').dbConnection;
dbConnection.connect();
// console.log('************', dbConnection);

module.exports = {
  messages: {
    get: function (req, res) {
      //console.log('#######1', req);
      //console.log('#######2', res);
      let queryString = `SELECT chats.id,users.name,messages.message,rooms.room,chats.createdAt FROM chats,users,messages,rooms 
      WHERE chats.userId = users.id AND chats.messageId = messages.id  
      AND chats.roomId=rooms.id ORDER BY chats.id DESC;`;
      dbConnection.query(queryString, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          //console.log('@@@@@@@@@@@', results[0].message);
          console.log('@@@@@@@@@@@@@ GET results:  ', { results });
          sendResponse(res, { results }, 200);
        }
      });



    }, // a function which handles a get request for all messages
    post: function (req, res) {

      console.log('---THE MESSAGE POST REQUEST BODY: ', req.body);

      dbConnection.query(`INSERT INTO users(name) VALUES ('${req.body.name}');`, (err) => { });
      dbConnection.query(`INSERT INTO rooms(room) VALUES (${JSON.stringify(req.body.room)});`, (err) => { });
      dbConnection.query(`INSERT INTO messages(message) VALUES (${JSON.stringify(req.body.message)});`);
      dbConnection.query(`INSERT INTO chats(userId,roomId,messageId,createdAt) VALUES 
                ((SELECT id FROM users WHERE name=${JSON.stringify(req.body.name)}),
                (SELECT id FROM rooms WHERE room=${JSON.stringify(req.body.room)}),
                (SELECT id FROM messages WHERE message=${JSON.stringify(req.body.message)}),
                CURRENT_TIMESTAMP);`);
      sendResponse(res, null, 201);
    }, // a function which handles posting a message to the database
    options: function (req, res) {
      sendResponse(res, null);
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      console.log('THE USER POST REQUEST BODY: ', req.body);

      let queryString = `INSERT INTO users (name) VALUES (${JSON.stringify(req.body.name)});`;
      dbConnection.query(queryString, function (err, results) {
        if (err) {
          console.log('--- User POST got an error: ', err);
        } else {
          // console.log('@@@@@@@@@@@', results);
          sendResponse(res, null, 201);
        }

      });
    },
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
