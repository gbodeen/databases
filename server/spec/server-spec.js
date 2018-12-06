/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function () {
  var dbConnection;

  beforeEach(function (done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'chats'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 0;');
    dbConnection.query('TRUNCATE TABLE chats;');
    dbConnection.query('TRUNCATE TABLE users;');
    dbConnection.query('TRUNCATE TABLE messages;');
    dbConnection.query('TRUNCATE TABLE rooms;');
    dbConnection.query('SET FOREIGN_KEY_CHECKS = 1;', done);
  });

  afterEach(function () {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function (done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { name: 'Dan' }
    }, function () {
      // Post a message to the node chat server:
      console.log('%%%%%%%%%%%%%%1');
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          name: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        console.log('%%%%%%%%%%%%%%2');
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = `SELECT message FROM messages 
        INNER JOIN chats ON chats.messageId = messages.id
        INNER JOIN users ON chats.userId = users.id
        WHERE users.name = 'Valjean'`;
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function (err, results) {

          // if (err) {
          //   console.log('{}{}{}{}{}{}{}{}', err);
          // }
          // Should have one result:
          expect(results.length).to.equal(1);

          console.log('SPEC select after POST:', results);

          // TODO: If you don't have a column named message, change this test.
          expect(results[0].message).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function (done) {

    // Let's insert a message into the db
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: {
        name: 'Jean',
        message: 'Men like you can never change!',
        roomname: 'main'
      }
    });

    var queryString = 'SELECT message FROM messages;';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function (err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function (error, response, body) {
        var messageLog = JSON.parse(response.body);
        console.log('++++++++++++++', messageLog);
        expect(messageLog[0].message).to.equal('Men like you can never change!');
        expect(messageLog[0].room).to.equal('main');
        done();
      });
    });
  });
});
