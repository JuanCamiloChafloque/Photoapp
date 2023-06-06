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
    device			varchar(128) not null,
    date			varchar(128) not null,
    latitude		double not null,
    longitude		double not null,
    PRIMARY KEY 	(id),
    FOREIGN KEY 	(assetId) REFERENCES assets(id));

ALTER TABLE metadata AUTO_INCREMENT = 20001;    

INSERT INTO users (email, password, lastName, firstName, bucketFolder) VALUES ('camilo@gmail.com', '$2a$10$X2C9emrOs1K/WxdYesIAxe.TGfELub77bLGU.Z09UuafGIYXHIACO', 'Chafloque', 'Camilo', '57998938-43a9-493c-a487-c46b42f94a87');
INSERT INTO users (email, password, lastName, firstName, bucketFolder) VALUES ('martin@test.com', '$2a$10$tq3AAXf8JIRMZajoDITUoOxE83QCI1RVTpF5Df7JALDS/0wpXufcq', 'Chafloque', 'Martin', 'db8a31e2-f437-4813-85d4-33a4980febc5');

INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, 'funny-monkey.jpg', 'A super funny monkey eating a banana!', '57998938-43a9-493c-a487-c46b42f94a87/597c824f-0add-41f2-a41c-08b33d0aa57e.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, 'Shrek.jpg', 'Shrek', '57998938-43a9-493c-a487-c46b42f94a87/9b2d4342-a68b-47e2-8dfc-57284c793d5e.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, 'cool-camel.jpg', 'A cool camel', '57998938-43a9-493c-a487-c46b42f94a87/6ef62443-3ad0-411b-979b-1f33a5c5e98a.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, 'clouds.jpg', 'Awesome clouds above the ocean!!', '57998938-43a9-493c-a487-c46b42f94a87/1f5120e8-d685-4a8a-b3e8-323c6becb299.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80001, 'sloth.jpg', 'A super cool sloth I found on my trip to Colombia last summer!', '57998938-43a9-493c-a487-c46b42f94a87/84baba66-a15f-4b90-9f2a-eb1f75b53f95.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80002, 'social-media.jpg', 'A cool photo I found at a cafe', 'db8a31e2-f437-4813-85d4-33a4980febc5/4a99e475-67cc-4605-b701-f2e884e947f0.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80002, 'cute-squirrel.jpg', 'A cute squirrel in a cage', 'db8a31e2-f437-4813-85d4-33a4980febc5/840e27c0-939e-4083-bd01-2e9dd12d612d.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80002, 'awesome-cate.jpg', 'The best and most awesome cat you will see on the internet', 'db8a31e2-f437-4813-85d4-33a4980febc5/ea2a9da8-425d-4259-9373-17ba674fca48.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80002, 'cat-vibes.jpg', 'A cool cat with space-looking glasses', 'db8a31e2-f437-4813-85d4-33a4980febc5/659441e1-b56e-4720-85e8-117c4fdbb0ab.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80002, 'dog-smiling.jpg', 'A cool picture I took of my dog with some awesome glasses', 'db8a31e2-f437-4813-85d4-33a4980febc5/c17dbc50-505a-43dd-b9d3-60825403b07b.jpg');
INSERT INTO assets (userId, assetName, description, bucketKey) VALUES (80002, 'ufo.jpg', 'A picture I took of a thing I saw in the sky onw night...', 'db8a31e2-f437-4813-85d4-33a4980febc5/d49a3e6e-b76d-46bd-84d2-df55495ee644.jpg');

INSERT INTO metadata(assetId, device, date, latitude, longitude) VALUES(1012, 'Iphone', '2023-05-31', 42.05818, -87.68313);
