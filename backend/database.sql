CREATE TABLE street_art (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NULL,
  image BLOB NOT NULL,
  longitude FLOAT NOT NUlL,
  latitude FLOAT NOT NULL,
  is_valid BOOLEAN
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE gallery (
  id_user int(11) NOT NULL,
  id_street_art int(11) NOT NULL,
  creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image BLOB NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




