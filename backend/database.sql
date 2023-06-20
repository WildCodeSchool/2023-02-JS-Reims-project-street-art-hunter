CREATE TABLE street_art (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NULL,
  image varchar(255) NOT NULL,
  score int(11) NOT NULL,
  longitude FLOAT NOT NUlL,
  latitude FLOAT NOT NULL,
  is_valid BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table user (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL UNIQUE,
  password VARCHAR(80) NOT NULL,
  mail VARCHAR(40) NOT NULL UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE gallery (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_user int(11) UNSIGNED NOT NULL,
  id_street_art int(11) UNSIGNED NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image varchar(255) NOT NULL,
  KEY `fk_gallery_user` (`id_user`),
  KEY `fk_gallery_street_art` (`id_street_art`),
  CONSTRAINT `fk_gallery_user` FOREIGN KEY (id_user) REFERENCES `user`(id),
  CONSTRAINT `fk_gallery_street_art` FOREIGN KEY (id_street_art) REFERENCES `street_art`(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE friends (
  id INT(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id_1 INT(11) UNSIGNED NOT NULL,
  user_id_2 INT(11) UNSIGNED NOT NULL,
  status ENUM ('0', '1') DEFAULT '0',
  CONSTRAINT `fk_friends_user_1` FOREIGN KEY (user_id_1) REFERENCES `user`(id),
  CONSTRAINT `fk_friends_user_2` FOREIGN KEY (user_id_2) REFERENCES `user`(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE message (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_friendship int(11) UNSIGNED NOT NULL,
  user_id int(11) UNSIGNED NOT NULL,
  content VARCHAR(80) NOT NULL,
  post_end DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_message_friendship` FOREIGN KEY (user_id) REFERENCES `user`(id),
  CONSTRAINT `fk_message_user` FOREIGN KEY (id_friendship) REFERENCES `friends`(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into street_art (image, longitude, latitude, is_valid, score) VALUES 
('/assets/images/rue_libergier.jpg',49.26538,4.01434, true, 50),
('/assets/images/avenue_paul_marchandeau.jpg',49.24220,4.02503, true, 100),
('/assets/images/boulevard_wilson_1.jpg',49.24043,4.02034, true, 50),
('/assets/images/boulevard_wilson_2.jpg',49.24098,4.01945, true, 100),
('/assets/images/place_du_forum.jpg',49.2567,4.03466, true, 50),
('/assets/images/rue_de_courcelles.jpg',49.26529,4.01402, true, 100);

insert into user (username, password, mail, is_admin) VALUES
("admin", "azerty", "admin@street.art", TRUE),
("user", "azerty", "user@street.art", FALSE);

INSERT INTO `gallery` (`id_user`, `id_street_art`, `creation_date`, `image`) VALUES
(1, 1, '2023-06-06 17:23:02', ''),
(1, 3, '2023-06-06 17:23:25', ''),
(2, 2, '2023-06-06 17:23:42', ''),
(2, 4, '2023-06-06 17:24:04', '');

