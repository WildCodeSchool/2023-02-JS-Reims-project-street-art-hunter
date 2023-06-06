CREATE TABLE street_art (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NULL,
  image varchar(255) NOT NULL,
  longitude FLOAT NOT NUlL,
  latitude FLOAT NOT NULL,
  is_valid BOOLEAN
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE gallery (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_user int(11) NOT NULL,
  id_street_art int(11) NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image BLOB NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



create table user (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL UNIQUE,
  password VARCHAR(80) NOT NULL,
  mail VARCHAR(40) NOT NULL UNIQUE,
  isadmin BOOLEAN
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



insert into street_art (image, longitude, latitude, is_valid) VALUES ('/assets/images/rue_libergier.jpg',49.26538,4.01434, true);
insert into street_art (image, longitude, latitude, is_valid) VALUES ('/assets/images/avenue_paul_marchandeau.jpg',49.24220,4.02503, true);
insert into street_art (image, longitude, latitude, is_valid) VALUES ('/assets/images/boulevard_wilson_1.jpg',49.24043,4.02034, true);
insert into street_art (image, longitude, latitude, is_valid) VALUES ('/assets/images/boulevard_wilson_2.jpg',49.24098,4.01945, true);
insert into street_art (image, longitude, latitude, is_valid) VALUES ('/assets/images/place_du_forum.jpg',49.2567,4.03466, true);
insert into street_art (image, longitude, latitude, is_valid) VALUES ('/assets/images/rue_de_courcelles.jpg',49.26529,4.01402, true)


