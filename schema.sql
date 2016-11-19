DROP DATABASE IF EXISTS cheapomail;
CREATE DATABASE cheapomail;
USE cheapomail;

-- create table 'users'

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id int(11) NOT NULL auto_increment,
    firstname char(255) NOT NULL default '',
    lastname char(255) NOT NULL default '',
    username char(255) NOT NULL default '',
    password char(255) NOT NULL default '',
    PRIMARY KEY (id)
);

-- create table 'messages'

DROP TABLE IF EXISTS messages;
CREATE TABLE users (
    id int(11) NOT NULL auto_increment,
    recipient_id int(11) NOT NULL default '0',
    user_id int(11) NOT NULL default '0',
    subject char(255) NOT NULL default '',
    body char(255) NOT NULL default '',
    date_sent DATE,
    PRIMARY KEY (id)
);

-- create table messages_read

DROP TABLE IF EXISTS messages_read;
CREATE TABLE users (
    id int(11) NOT NULL auto_increment,
    message_id int(11) NOT NULL default '0',
    reader_id int(11) NOT NULL default '0',
    date_read DATE,
    PRIMARY KEY (id)
);