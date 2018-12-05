CREATE DATABASE chat;
USE chat;
CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar
(255) NOT NULL
)ENGINE=INNODB;
CREATE TABLE messages (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message varchar
(255) DEFAULT ''
)ENGINE=INNODB;
CREATE TABLE rooms (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room varchar
(255) DEFAULT 'Lobby'
)ENGINE=INNODB;
CREATE TABLE chats  (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int NOT NULL,
  roomId int NOT NULL,
  messageID int NOT NULL,
  createdAt date NOT NULL,
  FOREIGN KEY
(userId) REFERENCES users
(id) ,
  FOREIGN KEY
(messageId) REFERENCES messages
(id),
  FOREIGN KEY
(roomId) REFERENCES rooms
(id)
)ENGINE=INNODB;

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

