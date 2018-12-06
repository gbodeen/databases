CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
) ENGINE=INNODB;

CREATE TABLE messages (
  id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255) DEFAULT ''
) ENGINE=INNODB;

CREATE TABLE rooms (
  id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room VARCHAR(255) DEFAULT 'Lobby'
) ENGINE=INNODB;

CREATE TABLE chats (
  id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT(3) NOT NULL,
  roomId INT(3) NOT NULL,
  messageID INT(3) NOT NULL,
  createdAt DATE NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (messageId) REFERENCES messages(id),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
) ENGINE=INNODB;

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

