const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (username, password, mail, isadmin) values (?, ?, ?, ?)`,
      [user.username, user.password, user.mail, false]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set username = ?, password = ?, mail = ? where id = ?`,
      [user.username, user.password, user.mail, user.id]
    );
  }

  findGallery(id) {
    return this.database.query(
      "SELECT gallery.id, street_art.name, street_art.image, street_art.score, gallery.creation_date FROM `gallery` JOIN street_art ON gallery.id_street_art=street_art.id where gallery.id_user = ?",
      [id]
    );
  }

  findFriends(id) {
    return this.database.query(
      "SELECT * FROM friends WHERE (user_id_1 = ? OR user_id_2 = ?)",
      [id, id]
    );
  }

  findAllScores() {
    return this.database.query(
      "SELECT gallery.id_user, user.username, SUM(street_art.score) AS score FROM `gallery` JOIN user ON gallery.id_user=user.id JOIN street_art ON gallery.id_street_art=street_art.id GROUP BY gallery.id_user ORDER BY score DESC"
    );
  }

  findScore(id) {
    return this.database.query(
      "SELECT gallery.id_user, user.username, SUM(street_art.score) AS score FROM `gallery` JOIN user ON gallery.id_user=user.id JOIN street_art ON gallery.id_street_art=street_art.id where gallery.id_user = ?",
      [id]
    );
  }
}

module.exports = UserManager;
