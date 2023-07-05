create table artist (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  bio VARCHAR(10000) NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table user (
  id INT(11) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  mail VARCHAR(40) NOT NULL UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE street_art (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255) NULL,
  image varchar(255) NOT NULL,
  score int(11) NOT NULL DEFAULT 0,
  longitude FLOAT NOT NUlL,
  latitude FLOAT NOT NULL,
  is_valid BOOLEAN DEFAULT FALSE,
  id_artist int(11) UNSIGNED NULL,
  add_by int(11) UNSIGNED NOT NULL,
  FOREIGN KEY (id_artist) REFERENCES `artist`(id),
  FOREIGN KEY (add_by) REFERENCES `user`(id)
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
  status ENUM ('0', '1', '2') DEFAULT '0',
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

insert into artist (name, bio) VALUES
('C215', "Christian GUEMY, alias C215 (Artiste peintre), vit et travaille à Ivry-sur-Seine
Christian Guémy alias C215 est un artiste urbain pochoiriste français né en 1973.
C215 intervient dans les rues du monde entier depuis le début des années 2000. Il présente ses œuvres peintes sur des objets ou sur toiles dans plusieurs galeries, en France et à l’étranger. Il a exposé dans de nombreux musées nationaux et collabore régulièrement avec des institutions publiques, culturelles ou sociales.
C215 est considéré aujourd’hui comme l’un des pochoiristes les plus reconnus de la scène Street art mondiale."),
('IPIN', "Germain Prévost (alias IPIN) est artiste et sérigraphe. Il fait des études sur l’environnement et la qualité de vie entre La Ciotat et Marseille. C’est dans ce cadre qu’il étudie l’environnement social de la Cité des Arts de la Rue. Déjà graffeur, connu sous le nom de Ipin, cette expérience le conduit à s’interroger sur le statut du street art et du graffiti au sein des arts de la rue. Il s’inspire notamment des œuvres de Vasarely, qui jalonnent les villes depuis les années 80. Ses créations, souvent géométriques et faisant appel à des anamorphoses, puisent également dans l’architecture.
Il développe le concept d’impactivisme (auto-proclamé) comme forme la plus basique de réappropriation graphique de l’espace public : c’est, en quelque sorte, un graffiti déshabillé de tout apparat décoratif, pour n’en garder que les composantes essentielles : un mouvement, une couleur, une forme et un support.  L’analogie picturale du cri primitif."),
('SCAMP80S', "Scamp80s, un artiste probablement local qui se fait aussi appeler N10.
De ce qu'on peut voir sur internet Scamp80s est avant tout un artiste abstrait qui fait aussi du lettrage (on trouve assez souvent son blase N10 – mais ici on ne le vois pas…)."),
('JIEM et MARY',"Mary Limonade, artiste Belge originaire de Liège et Jiem artiste Nantais de naissance, travaillent ensemble depuis plusieurs années sur Lille et ailleurs en France ou à l'étranger. Ils occupent aujourd'hui un des ateliers de la galerie Lasécu dans lequel Jiem est arrivé en 2008. Avant de monter ensemble le duo Wanderlust Social Club, chacun d'eux a développé des pratiques personnelles de manière autodidacte.
Leurs premières connections artistiques se sont faites par le graffiti, de manière libre et sauvage. De cette passion partagée leur vient le goût de la dérive, de l'exploration, du voyage. D'où le choix de ce nom commun, Wanderlust, mot d'origine allemande qui signifie dans la langue anglaise également la soif de voyage, l'attrait de l'inconnu et de l'exotisme.
L'esprit d'indépendance du graffiti se retrouve dans le travail de Mary et Jiem à travers une grande liberté d'action et un large éventail de pratiques, loin des standards des galeries street art formatées. En plus d'un important travail graphique et illustratif dans leurs dessins et peintures, sur supports ou sur murs, ils pratiquent la photographie argentique, l'édition et l'art textile. Quel que soit le mode d'expression choisi, certains éléments et thèmes sont récurrents chez les deux artistes, le voyage, la ville et ses éléments graphiques, les identités collectives, les cultures underground et leurs pratiques marginales, les interactions sociales, l'amour et le romantisme, entre autres.
Passionnés par les arts naïfs et les différentes formes de peinture populaire, la manière de travailler en duo de Mary et Jiem est très instinctive et spontanée, toutes leurs oeuvres gardent une grande fraicheur, affranchies des règles académiques et des standards de représentation. Ils sont également constamment dans la remise en cause et à la recherche de nouveaux terrains d'exploration, ce qui fait de leur travail artistique quotidien une aventure infinie et particulièrement excitante.");

insert into user (username, password, mail, is_admin) VALUES
("admin", "$argon2id$v=19$m=65536,t=5,p=1$LiOUxKuxGlqllBS/orpihg$ztzttCi1WClTHAGgKSZF9xYa579t7gf2P3aqHP1NJZ0", "admin@street.art", TRUE),
("user", "$argon2id$v=19$m=65536,t=5,p=1$RplfnZnP/TmoEpfK0ranvg$nlSGwC0krCG6Di+7Mu/8N8JgwL0Or3vzP2kBDNDr86s", "user@street.art", FALSE);

insert into street_art (image, longitude, latitude, is_valid, score, id_artist, add_by) VALUES 
('/assets/images/rue_libergier.jpg',49.26538,4.01434, true, 50, 1,1),
('/assets/images/avenue_paul_marchandeau.jpg',49.24220,4.02503, true, 100, 2,1),
('/assets/images/boulevard_wilson_1.jpg',49.24043,4.02034, true, 50, 3,1),
('/assets/images/boulevard_wilson_2.jpg',49.24098,4.01945, true, 100, 4,1),
('/assets/images/place_du_forum.jpg',49.2567,4.03466, true, 50, 1,1),
('/assets/images/rue_de_courcelles.jpg',49.26529,4.01402, true, 100, 1,1),
('/assets/images/wild.jpg',49.2652826,4.0168665, true, 100, null,1);

INSERT INTO `gallery` (`id_user`, `id_street_art`, `creation_date`, `image`) VALUES
(1, 1, '2023-06-06 17:23:02', '/assets/images/rue_libergier.jpg'),
(1, 3, '2023-06-06 17:23:25', '/assets/images/boulevard_wilson_1.jpg'),
(2, 2, '2023-06-06 17:23:42', '/assets/images/avenue_paul_marchandeau.jpg'),
(2, 4, '2023-06-06 17:24:04', '/assets/images/boulevard_wilson_2.jpg');

INSERT INTO friends (user_id_1, user_id_2) VALUES (1, 2), (2, 1);