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
    latitude		double not null,
    longitude		double not null,
    PRIMARY KEY 	(id),
    FOREIGN KEY 	(assetId) REFERENCES assets(id));

ALTER TABLE metadata AUTO_INCREMENT = 20001;    
