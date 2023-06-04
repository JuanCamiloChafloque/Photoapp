USE photoapp;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS metadata;

CREATE TABLE users(
    id       		int not null AUTO_INCREMENT,
    email        	varchar(128) not null,
	password        varchar(128) not null,
    lastName     	varchar(64) not null,
    firstName    	varchar(64) not null,
    bucketFolder 	varchar(48) not null,
    PRIMARY KEY 	(id),
    UNIQUE      	(email),
    UNIQUE      	(bucketFolder));

ALTER TABLE users AUTO_INCREMENT = 80001;

CREATE TABLE assets(
    id      		int not null AUTO_INCREMENT,
    userId       	int not null,
    assetName    	varchar(128) not null,
	description    	varchar(128) not null,  
    bucketKey    	varchar(128) not null,
    PRIMARY KEY 	(id),
    FOREIGN KEY 	(userId) REFERENCES users(id),
    UNIQUE      	(bucketKey));

ALTER TABLE assets AUTO_INCREMENT = 1001;

CREATE TABLE metadata(
    id      		int not null AUTO_INCREMENT,
    assetId       	int not null,
    date			varchar(128) not null,
    latitude		decimal not null,
    longitude		decimal not null,
    PRIMARY KEY 	(id),
    FOREIGN KEY 	(assetId) REFERENCES assets(id));

ALTER TABLE metadata AUTO_INCREMENT = 20001;    

INSERT INTO users (email, password, lastName, firstName, bucketFolder) VALUES ('camilo@gmail.com', '$2a$10$X2C9emrOs1K/WxdYesIAxe.TGfELub77bLGU.Z09UuafGIYXHIACO', 'Chafloque', 'Camilo', '57998938-43a9-493c-a487-c46b42f94a87');
INSERT INTO users (email, password, lastName, firstName, bucketFolder) VALUES ('vedant@test.com', '$2a$10$tq3AAXf8JIRMZajoDITUoOxE83QCI1RVTpF5Df7JALDS/0wpXufcq', 'Apte', 'Vedant', 'db8a31e2-f437-4813-85d4-33a4980febc5');

INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, '', '', '');